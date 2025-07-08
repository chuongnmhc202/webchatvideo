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
import { MdChat, MdCall, MdVideoCall, MdDelete} from 'react-icons/md'
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { message } from "antd";

interface AsideFilterMessageProps {
  selectedCategory: string;
}

export default function ChatBox({ selectedCategory  }: AsideFilterMessageProps) {
  const { socketReady, socket } = useSocketContext();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const [typeFile, setTypeFile] = useState<string>("file");

  const [textMessage, setTextMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const scroll = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);


  

  const { messagesData, userData, groupResponse } = useMessages();
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
      limit: 5,
      is_group:messagesData.is_group,
      lastMessageTimestamp: lastTimestamp,
    };
    const response = await messagesApi.getMessage(query);
    return response.data;
  };

  // Load more on scroll top
  useEffect(() => {
    const handleScroll = async () => {
      const container = chatBodyRef.current;
      if (!container || container.scrollTop !== 0 || allMessages.length === 0) return;

      setLoadingMore(true);
      const firstMsg = allMessages[0];
      let isoTime;
      if (firstMsg.timestamp) {
        isoTime = new Date(firstMsg.timestamp).toISOString();
      }

      const moreMessages = await fetchMessages(isoTime);

      if (moreMessages.length > 0) {
        const scrollHeightBefore = container.scrollHeight;
        setAllMessages((prev) => [...moreMessages, ...prev]);
        setTimeout(() => {
          const scrollHeightAfter = container.scrollHeight;
          container.scrollTop = scrollHeightAfter - scrollHeightBefore;
        }, 200);
      }

      setLoadingMore(false);
    };

    const container = chatBodyRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [allMessages]);

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


    // console.log(messagesData, userData, groupResponse );

  let newMsg: IMessage;
  if (previewImage && file) {
    const uploaded = await handleSendPastedImage();
    if (!uploaded) {
      toast.error("Gửi ảnh thất bại");
      return;
    }

    newMsg = uploaded
  } else {
    if (!message.trim()) return; // Ngăn gửi tin nhắn rỗng khi không có ảnh
    newMsg = {
      text: message,
      sender: PhoneSender,
      receiver: messagesData?.receiver || '',
      is_group: selectedCategory !== '1',
      content_type: 'text'
    };
  }

  // console.log(newMsg)
    if (!socket) return
    if (socket) {
      console.log("Connect");
      socket.emit("sendMessage", newMsg);
    } else {
      console.warn("Socket is not connected.");
    }
    setAllMessages(prev => [...prev, newMsg]);
    clearInput("");
  };

  const resetUnreadCount = async (userPhone: string, friendPhone: string, groupId :string) => {

    if (selectedCategory === '1') {

      try {
        const response = await axios.post('http://localhost:8180/api/user/friend/friend/unread/reset', {
          userPhone,
          friendPhone
        });
        return response.data;
      } catch (error) {
        console.error('Reset unread count failed:', error);
        throw error;
      }
    } else {
      try {
        const response = await axios.put('http://localhost:8180/api/user/group/group/member/unread', {
          groupId
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





  socket.on("receiveMessage", handleReceive);
  return () => {
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
        duration_video: "0"
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
      }else {
        contentType = 'file';
        setPreviewImage(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
        setTypeFile("file");
      }


      // const uniqueId = uuidv4();
      // const storageRef = ref(storage, `files/${uniqueId}_${selectedFile.name}`);
      // const snapshot = await uploadBytes(storageRef, selectedFile);
      // const downloadURL = await getDownloadURL(snapshot.ref);

      // const newMsg: IMessage = {
      //   sender: PhoneSender,
      //   receiver: userData?.phone || '',
      //   is_group: selectedCategory !== '1',
      //   content_type: contentType,
      //   url_file: downloadURL,
      //   name_file: selectedFile.name,
      //   size_file: selectedFile.size.toString(),
      //   mime_type_file: selectedFile.type,
      //   duration_video: "0",
      // };
      // console.log(newMsg);
      // mutationSendMessage.mutate(newMsg);
    } catch (error) {
      toast.error('Upload file thất bại');
    }
  };

  const handleVideoCall = (callerId: string, receiverId: string) => {
    const phones = [callerId, receiverId].sort();
    const roomId = `room${phones[0]}${phones[1]}`;
    const url = `/call?roomId=${roomId}&callerId=${callerId}&receiverId=${receiverId}&type=sent`;
    window.open(
      url,
      "_blank",
      "popup=yes,width=1000,height=700,left=200,top=100,resizable=no"
    );
  };
  

  return (
    <div className="sticky left-[0rem] top-[0rem]  z-10 h-full overflow-y-auto bg-white p-4 shadow-md rounded-md ">
    <div className="h-[90vh] flex flex-col  rounded-xl shadow-md overflow-hidden bg-white">
      <div className="flex justify-between items-center p-4 bg-green-50 -b font-semibold text-gray-800">
<span className="flex items-center gap-2 text-orange-200">
  <MdChat className="text-2xl text-gray-600" />
  {groupResponse ? `Nhóm: ${groupResponse.name}` : `Bạn: ${userData?.user.name}`}
</span>

        <div className="flex items-center gap-3">
          <button onClick={() => alert("Đang gọi thoại...")} title="Gọi thoại" className="hover:bg-green-100 p-2 rounded-full"><MdCall className="text-2xl text-gray-600" /></button>
          <button onClick={() => handleVideoCall(PhoneSender, userData?.user.phone || "")} title="Gọi video" className="hover:bg-green-100 p-2 rounded-full"><MdVideoCall className="text-2xl text-gray-600" /></button>
          <button title="Xoá tất cả tin nhắn" className="hover:bg-red-100 p-2 rounded-full"><MdDelete className="text-2xl" /></button>
        </div>
      </div>

      <div ref={chatBodyRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
        {loadingMore && <div className="text-center text-sm text-gray-400">Đang tải thêm...</div>}
{allMessages.map((message, index) => (
  <div
    key={index}
    ref={index === allMessages.length - 1 ? scroll : null}
    className={`w-full flex ${message.sender === PhoneSender ? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`max-w-[70%] p-3 rounded-xl text-sm inline-block ${
        message.content_type === 'text' || message.content_type === 'file'
          ? message.sender === PhoneSender
            ? 'bg-blue-400 text-white'
            : 'bg-white border'
          : '' // image/video -> no background
      }`}
    >
      {message.content_type === 'image' && message.url_file && (
        <div className="flex justify-center mb-2">
          <img
            src={message.url_file}
            alt={message.name_file || 'Image'}
            className="rounded-lg max-w-full w-full max-h-[300px] object-contain"
          />
        </div>
      )}

      {message.content_type === 'video' && message.url_file && (
        <div className="flex justify-center mb-2">
          <video
            controls
            className="rounded-lg w-full max-w-xs max-h-[300px] object-contain"
            src={message.url_file}
          />
        </div>
      )}

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

      <div className="text-sm break-words">{message.text}</div>

      <div className="text-[10px] text-right text-gray-300 mt-1">
        {moment(message.timestamp).calendar(undefined, {
          lastDay: '[Hôm qua] HH:mm',
          lastWeek: 'dddd HH:mm',
          sameElse: 'DD/MM/YYYY HH:mm:ss',
        })}
      </div>
    </div>
  </div>
))}

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
              onChange={setTextMessage}
              fontFamily="Oswald"
              // Color="rgba(10, 200, 10, 0.5)"
              placeholder="Nhập tin nhắn..."
              shouldReturn={true}
              shouldConvertEmojiToImage={false}

            />
        <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
        <label htmlFor="fileInput" title="Gửi file" className="cursor-pointer">📎</label>
        
      <button
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
      onClick={() =>
        sendTextMessage(textMessage, setTextMessage)
      }
    >
      Gửi
    </button>
      </div>
    </div>
</div>

  );
}
