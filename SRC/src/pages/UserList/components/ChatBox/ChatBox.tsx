import { useEffect, useRef, useState } from "react";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { useQuery, useMutation } from '@tanstack/react-query';
import { User } from 'src/types/user.type';
import { useMessages } from 'src/contexts/MessagesContext';
import { GetMessagesQuery, IMessage } from 'src/types/utils.type';
import messagesApi from 'src/apis/messages.api';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
import { storage } from 'src/configs/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSocketContext } from 'src/contexts/SocketContext'
import { MdChat, MdCall, MdVideoCall, MdDelete } from 'react-icons/md'
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { message } from "antd";
import Popover from '../../../../components/Popover'
import { AiOutlineArrowLeft } from 'react-icons/ai'

interface AsideFilterMessageProps {
  selectedCategory: string;
  isChatBox: boolean;
  setIsChatBox: React.Dispatch<React.SetStateAction<boolean>>
}

type GroupedMessages = {
  date: string;
  messages: IMessage[];
};

export default function ChatBox({ selectedCategory, isChatBox, setIsChatBox }: AsideFilterMessageProps) {
  const { socketReady, socket } = useSocketContext();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const [typeFile, setTypeFile] = useState<string>("file");

  const [textMessage, setTextMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const scroll = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const [mediaPreview, setMediaPreview] = useState<{ type: 'image' | 'video'; url: string } | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<{id:string, avt: string}[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);



  const { messagesData, userData, groupResponse } = useMessages();
  const messagesDataRef = useRef(messagesData);
  useEffect(() => {
    messagesDataRef.current = messagesData;
  }, [messagesData]);
  const { data: profileDataLS, refetch } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const raw = localStorage.getItem('profile');
      if (!raw) throw new Error('No profile found in localStorage');
      return JSON.parse(raw) as User;
    },
  });
  const PhoneSender = profileDataLS?.phone || '';
  const [debouncedReceiver] = useDebounce(messagesData?.receiver, 300);

  useEffect(() => {
    if (!PhoneSender || !debouncedReceiver) return;

    resetUnreadCount(PhoneSender, debouncedReceiver, messagesData?.receiver || '')
      .then(() => console.log(`Reset unread for ${debouncedReceiver}`))
      .catch(console.error);
  }, [PhoneSender, debouncedReceiver]);

  useEffect(() => {
    if (!messagesData) return;

    console.log("Fetching messages with:", messagesData);
    fetchMessages()
      .then((newMessages) => {
        console.log("Fetched messages:", newMessages);
        setAllMessages(newMessages);
        setTimeout(() => {
          scroll.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      })
      .catch(err => {
        console.error("Error fetching messages", err);
      });
  }, [messagesData]);

  const fetchMessages = async (lastTimestamp?: string) => {
    if (!messagesData) return [];
    const query: GetMessagesQuery = {
      ...messagesData,
      limit: 10,
      is_group: messagesData.is_group,
      lastMessageTimestamp: lastTimestamp,
    };
    const response = await messagesApi.getMessage(query);
    return response.data;
  };

  // Load more on scroll top
  useEffect(() => {
    const container = chatBodyRef.current;
    console.log("croll 2")

    if (!container) return;

    console.log("croll 1")

    const handleScroll = async () => {
      const container = chatBodyRef.current;
      if (!container || container.scrollTop !== 0 || loadingMore || allMessages.length === 0) return;

      setLoadingMore(true);

      const firstMsg = allMessages[0];
      const isoTime = firstMsg.timestamp ? new Date(firstMsg.timestamp).toISOString() : undefined;

      const prevScrollTop = container.scrollTop;
      const prevScrollHeight = container.scrollHeight;

      try {
        const moreMessages = await fetchMessages(isoTime);
        if (moreMessages.length > 0) {
          setAllMessages((prev) => [...moreMessages, ...prev]);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const newScrollHeight = container.scrollHeight;
              const delta = newScrollHeight - prevScrollHeight;
              container.scrollTop = prevScrollTop + delta;
            });
          });
        }
      } catch (err) {
        console.error('Error loading more messages:', err);
      } finally {
        setLoadingMore(false);
      }
    };



    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [allMessages, loadingMore]);

  const mutationSendMessage = useMutation({
    mutationFn: (newMsg: IMessage) => messagesApi.sendMessage(newMsg),
    onSuccess: (data) => {
      setAllMessages((prev) => [...prev, data.data]);
      toast.success("Gửi thành công");
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    },
    onError: () => {
      toast.error("Gửi thất bại");
    }
  });

  const sendTextMessage = async (message: string, clearInput: (msg: string) => void) => {


    if (isSending) return;
    setIsSending(true);

    let newMsg: IMessage;
    if (previewImage && file) {
      const uploaded = await handleSendPastedImage();
      if (!uploaded) {
        toast.error("Gửi ảnh thất bại");
        setIsSending(false);
        return;
      }

      newMsg = uploaded
    } else {
      if (!message.trim()) {
        setIsSending(false);
        return;
      }
      newMsg = {
        text: message,
        sender: PhoneSender,
        receiver: messagesData?.receiver || '',
        is_group: selectedCategory !== '1',
        content_type: 'text',
        avt: profileDataLS?.avatar,
        name: profileDataLS?.name
      };
    }

    // console.log(newMsg)
    if (!socket) {
      setIsSending(false);
      return;
    }
    if (socket) {
      console.log("Connect");
      socket.emit("sendMessage", newMsg);
    } else {
      console.warn("Socket is not connected.");
    }
    setAllMessages(prev => [...prev, newMsg]);
    clearInput("");
    setIsSending(false);
  };

  const resetUnreadCount = async (userPhone: string, friendPhone: string, groupId: string) => {
    const env = (window as any).env;

    const apiUrl = env?.VITE_API_URL_DEV_USER ?? 'http://localhost:8180';
    if (selectedCategory === '1') {
      try {
        const response = await axios.post(`${apiUrl}/api/user/friend/friend/unread/reset`, {
          userPhone,
          friendPhone,
          sender: PhoneSender
        });
        return response.data;
      } catch (error) {
        console.error('Reset unread count failed:', error);
        throw error;
      }
    } else {
      try {
        const response = await axios.put(`${apiUrl}/api/user/group/group/member/unread/${groupId}`, {
          userPhone: PhoneSender
        });
        return response.data;
      } catch (error) {
        console.error('Reset unread count failed:', error);
        throw error;
      }
    }

  };

  useEffect(() => {

    if (!socket) return

    const handleReceive = (msg: IMessage) => {
      console.log("📥 Tin nhắn đến:", msg);
      // toast.success(`📩 Có tin nhắn đến từ SĐT: ${msg.sender}`);
      setAllMessages(prev => [...prev, msg]);
    };

    const handleTyping = ({ sender, receiver, type, avt }: { sender: string; receiver: string; type: string; avt: string }) => {
      if (sender !== PhoneSender) {
        setTypingUsers((prev) => {
          // Nếu sender đã tồn tại thì không thêm nữa
          if (prev.some((user) => user.id === sender)) return prev;
          return [...prev, { id: sender, avt }];
        });
      }
    };

    const handleStopTyping = ({ sender }: { sender: string }) => {
      setTypingUsers((prev) => prev.filter((user) => user.id !== sender));
    };

    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);

    socket.on("receiveMessage", handleReceive);
    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
      socket.off("receiveMessage", handleReceive);
    };
  }, []);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.indexOf("image") === 0) {
          const file = item.getAsFile();
          if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setFile(file);
            setTypeFile("image")
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const isValidContentType = (type: string): type is IMessage["content_type"] => {
    return ["text", "image", "file", "video", "video_call_signal"].includes(type);
  };

  const handleSendPastedImage = async () => {
    if (!previewImage || !file) return;

    try {
      const uniqueId = uuidv4();
      const storageRef = ref(storage, `images/${uniqueId}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      if (!isValidContentType(typeFile)) {
        throw new Error("Invalid content type");
      }
      const newMsg: IMessage = {
        sender: PhoneSender,
        receiver: userData?.user.phone || '',
        is_group: selectedCategory !== '1',
        content_type: typeFile,
        url_file: downloadURL,
        name_file: file.name,
        size_file: file.size.toString(),
        mime_type_file: file.type,
        duration_video: "0",
        avt: profileDataLS?.avatar,
        name: profileDataLS?.name
      };

      // mutationSendMessage.mutate(newMsg);
      setPreviewImage(null);
      setFile(undefined);
      return newMsg;
    } catch (error) {
      toast.error("Gửi ảnh thất bại");
    }
  };


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) { // >10MB
      toast.error("File quá lớn, vui lòng chọn file <10MB");
      return;
    }

    try {

      let contentType: 'image' | 'video' | 'file' = 'file';
      if (selectedFile.type.startsWith('image')) {
        contentType = 'image';
        setPreviewImage(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
        setTypeFile("image");
      } else if (selectedFile.type.startsWith('video')) {
        contentType = 'video';
        setPreviewImage(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
        setTypeFile("video");
      } else {
        contentType = 'file';
        setPreviewImage(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
        setTypeFile("file");
      }
    } catch (error) {
      toast.error('Upload file thất bại');
    }
  };

  const sendSignalMessage = async (message: IMessage) => {
    const env = (window as any).env;
    const apiUrl = env?.VITE_API_URL_DEV_CHAT ?? 'http://localhost:8181';
    try {
      const response = await axios.post(`${apiUrl}/api/chat/message/send`, message);
      console.log("✅ Message sent:", response.data);
    } catch (err) {
      console.error("❌ Failed to send signal message:", err);
    }
  };

  const handleVideoCall = async (callerId: string, receiverId: string) => {
    if (!socket) return
    if (socket) {


      if (selectedCategory == '1') {

        await sendSignalMessage({
          sender: callerId || '',
          receiver: receiverId || '',
          is_group: false,
          content_type: 'video_call_signal',
          type_video_call: "offer",
          text: "🔴 Cuộc gọi video bắt đầu",
          timestamp: new Date().toISOString(),
          avt: profileDataLS?.avatar,
          name: profileDataLS?.name
        });



        const phones = [callerId, receiverId].sort();
        const roomId = `room${phones[0]}${phones[1]}`;
        const url = `/call?roomId=${roomId}&callerId=${callerId}&receiverId=${receiverId}&type=sent&isGroup=0`;

        console.log("Connect- call -video sent");
        socket.emit("join-room-call-sent", {
          roomId,
          callerId,
          receiverId,
          isGroup: 0,
          name: profileDataLS?.name,
          avt: profileDataLS?.avatar
        });

        window.open(
          url,
          "_blank",
          "popup=yes,width=1000,height=700,left=200,top=100,resizable=no"
        );

      } else {

        await sendSignalMessage({
          sender: callerId || '',
          receiver: receiverId || '',
          is_group: true,
          content_type: 'video_call_signal',
          type_video_call: "offer",
          text: "🔴 Cuộc gọi video bắt đầu",
          timestamp: new Date().toISOString(),
          avt: profileDataLS?.avatar,
          name: profileDataLS?.name
        });

        const phones = [callerId, receiverId].sort();
        const roomId = `room${phones[0]}${phones[1]}`;
        const url = `/call?roomId=${roomId}&callerId=${callerId}&receiverId=${receiverId}&type=sent&isGroup=1`;

        console.log("Connect- call -video sent group");
        socket.emit("join-room-call-sent", {
          roomId,
          callerId,
          receiverId,
          isGroup: 1,
          name: profileDataLS?.name,
          avt: profileDataLS?.avatar
        });

        window.open(
          url,
          "_blank",
          "popup=yes,width=1000,height=700,left=200,top=100,resizable=no"
        );

      }
    } else {
      console.warn("Socket is not connected.");
    }
  };

  const handleTyping = (value: string) => {
    setTextMessage(value);
  console.log(messagesData?.receiver)

    if (!socket){
      return
    }


    if (!isTyping) {
      setIsTyping(true);
      if (!socket){
        return
      }
      socket.emit("typing", { sender: PhoneSender  , receiver: messagesDataRef.current?.receiver, type: selectedCategory !== '1', avt: profileDataLS?.avatar});
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", { sender: PhoneSender   , receiver: messagesDataRef.current?.receiver, type: selectedCategory !== '1', avt: profileDataLS?.avatar});
      setIsTyping(false);
    }, 1500);
  };


  return (
    <div className='flex flex-col bg-white p-4 shadow-md rounded-md border'>

      <div className="h-[calc(100vh-80px)] flex flex-col  rounded-xl shadow-md overflow-hidden bg-white">
        <div className="flex justify-between items-center p-4 bg-green-50 -b font-semibold text-gray-800">
          <button
            onClick={() => setIsChatBox(false)}
            className='block lg:hidden text-blue-500 bg-gray-200 p-2 rounded-full'
          >
            <AiOutlineArrowLeft size={20} />
          </button>
          <span className="flex items-center gap-2 text-orange-200">
            <MdChat className="text-2xl text-gray-600" />
            {/* {groupResponse ? `Nhóm: ${groupResponse.name}` : `Bạn: ${userData?.user.name}`} */}
            {groupResponse?.name
              ? `${groupResponse.name}`
              : userData?.user?.name
                ? `${userData.user.name}`
                : ""}

          </span>

          <div className="flex items-center gap-3">
            {/* <button onClick={() => handleVideoCallSFU(PhoneSender, selectedCategory !== '1' ? groupResponse?.id || "" : userData?.user.phone || "")} title="Gọi thoại" className="hover:bg-green-100 p-2 rounded-full"><MdCall className="text-2xl text-gray-600" /></button> */}
            <button onClick={() => handleVideoCall(PhoneSender, selectedCategory !== '1' ? groupResponse?.id || "" : userData?.user.phone || "")} title="Gọi video" className="hover:bg-green-100 p-2 rounded-full"><MdVideoCall className="text-2xl text-gray-600" /></button>
            <button title="Xoá tất cả tin nhắn" className="hover:bg-red-100 p-2 rounded-full"><MdDelete className="text-2xl" /></button>
          </div>
        </div>

        <div ref={chatBodyRef} style={{ minHeight: '200px' }} className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-2 space-y-2 bg-gray-50">
          {loadingMore && <div className="text-center text-sm text-gray-400">Đang tải thêm...</div>}
          {allMessages.map((message, index) => {
            const isOwnMessage = message.sender === PhoneSender;

            return (
              <div
                key={index}
                ref={index === allMessages.length - 1 ? scroll : null}
                className={`w-full flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 items-start ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  {!isOwnMessage && (
                    <img
                      src={message.avt}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}

                  <div className="flex flex-col max-w-[70%]">
                    {/* 👤 Name of sender */}
                    <span className="text-xs text-gray-500 mb-1 whitespace-nowrap">
                      {isOwnMessage ? '' : message.name || message.sender}
                    </span>

                    <Popover

                      as={'span'}
                      className='relative flex cursor-pointer  items-center py-1'
                      renderPopover={
                        <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                          <div className='flex flex-col py-2 pl-3 pr-28'>
                            <span className="text-xs text-gray-400 mt-1">
                              {moment(message.timestamp).calendar(undefined, {
                                lastDay: '[Hôm qua] HH:mm',
                                lastWeek: 'dddd HH:mm',
                                sameElse: 'DD/MM/YYYY HH:mm:ss',
                              })}
                            </span>
                          </div>
                        </div>
                      }
                    >



                      {/* Bubble */}
                      <div
                        className={`p-3 rounded-xl text-sm inline-block ${message.content_type === 'text' || message.content_type === 'file'
                            ? isOwnMessage
                              ? 'bg-blue-400 text-white'
                              : 'bg-white border'
                            : ''
                          }`}
                      >
                        {/* IMAGE */}
                        {message.content_type === 'image' && message.url_file && (
                          <div className="flex justify-center mb-2">
                            <img
                              src={message.url_file}
                              alt={message.name_file || 'Image'}
                              onClick={() => setMediaPreview({ type: 'image', url: message.url_file! })}
                              className="rounded-lg max-w-full w-full max-h-[300px] object-contain"
                            />
                          </div>
                        )}

                        {message.content_type === 'video_call_signal' && (
                          <div className={`w-full flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] flex items-center gap-2 p-3 rounded-xl shadow-sm
                  ${isOwnMessage ? 'bg-green-50 text-green-900' : 'bg-blue-50 text-blue-900'}
                `}>
                              {/* Icon + Avatar */}
                              <div className="flex items-center gap-2">
                                <span className="text-xl">📹</span>
                              </div>

                              {/* Nội dung */}
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {isOwnMessage
                                    ? 'Bạn đã bắt đầu cuộc gọi video'
                                    : `${message.name || message.sender} đang gọi bạn`}
                                </span>
                                {message.text && (
                                  <span className="text-sm text-gray-500 mt-1 italic">{message.text}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* VIDEO */}
                        {message.content_type === 'video' && message.url_file && (
                          <div className="flex justify-center mb-2">
                            <video
                              controls
                              onClick={() => setMediaPreview({ type: 'video', url: message.url_file! })}
                              className="rounded-lg w-full max-w-xs max-h-[300px] object-contain"
                              src={message.url_file}
                            />
                          </div>
                        )}

                        {/* FILE */}
                        {message.content_type === 'file' && message.url_file && (
                          <a
                            href={message.url_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-sm block border mb-1"
                          >
                            📎 {message.name_file}
                          </a>
                        )}

                        {/* TEXT */}
                        {message.content_type === 'text' && message.text && (
                          <div className="text-sm break-words">{message.text}</div>
                        )}
                      </div>

                    </Popover>

                  </div>
                </div>
              </div>
            );
          })}

            {/* ✅ Hiển thị typingUsers – nằm ngoài map() */}
          {typingUsers.length > 0 && (
            <div className="flex items-center space-x-2 mt-2 ml-2">
              {typingUsers.map((user, idx) => (
                <div key={idx} className="flex items-center space-x-1">
                  <img
                    src={user.avt}
                    alt="người dùng"
                    className="w-6 h-6 rounded-full object-cover border"
                  />
                  <div className="text-xs text-gray-500 italic animate-pulse">đang nhập...</div>
                </div>
              ))}
            </div>
          )}
        </div>



        {previewImage && (
          <div className="flex items-center gap-2 mb-2">

            {typeFile === 'image' && (
              <img
                src={previewImage}
                className="w-32 h-32 object-contain rounded-lg "
                alt="Preview"
              />
            )}
            {typeFile === 'video' && (
              <video
                src={previewImage}
                className="w-32 h-32 object-contain rounded-lg "
                controls
              />
            )}

            {typeFile === 'file' && (
              <div className="flex items-center gap-2 p-3  rounded-lg bg-gray-100">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded">
                  📄
                </div>
                <div className="text-sm text-gray-700 truncate max-w-[150px]">
                  {file?.name || 'Tệp đã chọn'}
                </div>
              </div>
            )}

            <button onClick={() => {
              setPreviewImage(null);
              setFile(undefined);
            }} className="text-red-500">❌ Hủy</button>
          </div>
        )}


        <div className="p-4 flex items-center gap-3 -t bg-white">
          <InputEmoji
            value={textMessage}
            onChange={handleTyping}
            fontFamily="Oswald"
            // Color="rgba(10, 200, 10, 0.5)"
            placeholder="Nhập tin nhắn..."
            shouldReturn={true}
            shouldConvertEmojiToImage={false}

          />
          <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
          <label htmlFor="fileInput" title="Gửi file" className="cursor-pointer">📎</label>

          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 min-w-[80px]"
            onClick={() => sendTextMessage(textMessage, setTextMessage)}
            disabled={isSending}
          >
            {isSending ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              'Gửi'
            )}
          </button>

        </div>
      </div>
      {mediaPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setMediaPreview(null)} // click để đóng
        >
          {mediaPreview.type === 'image' ? (
            <img
              src={mediaPreview.url}
              className="w-[80%] h-[80%] object-contain rounded-lg shadow-lg"
            />
          ) : (
            <video
              src={mediaPreview.url}
              className="w-[80%] h-[80%] object-contain rounded-lg shadow-lg"
              controls
              autoPlay
            />
          )}

          <button
            onClick={() => setMediaPreview(null)}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            ✕
          </button>
        </div>
      )}

    </div>

  );
  
}



