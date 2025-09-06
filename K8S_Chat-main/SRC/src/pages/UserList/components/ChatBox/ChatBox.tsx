import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AxiosResponse } from "axios";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdChat, MdVideoCall, MdDelete } from 'react-icons/md';
import InputEmoji from "react-input-emoji";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import messagesApi from 'src/apis/messages.api';
import { storage } from 'src/configs/firebase';
import { useMessages } from 'src/contexts/MessagesContext';
import { useSocketContext } from 'src/contexts/SocketContext';
import { User } from 'src/types/user.type';
import { GetMessagesQuery, IMessage } from 'src/types/utils.type';
import { useDebounce } from 'use-debounce';
import { v4 as uuidv4 } from "uuid";
import Popover from '../../../../components/Popover';

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
  const [typingUsers, setTypingUsers] = useState<{ id: string, avt: string }[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (allMessages.length > 0) {
      requestAnimationFrame(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [allMessages]);



  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setScale((prev) => prev + 0.2);
  const handleZoomOut = () => setScale((prev) => Math.max(0.2, prev - 0.2));
  const handleRotate = () => setRotation((prev) => prev + 90);


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
  const nameSender = profileDataLS?.name || '';
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
        is_group: selectedCategory == '2',
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
    if (selectedCategory === '1' || selectedCategory === '4') {
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
        receiver: messagesData?.receiver || '',
        is_group: selectedCategory == '2',
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


      if (selectedCategory == '1' || selectedCategory == '4') {

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

    if (!socket) {
      return
    }


    if (!isTyping) {
      setIsTyping(true);
      if (!socket) {
        return
      }
      socket.emit("typing", { sender: PhoneSender, receiver: messagesDataRef.current?.receiver, type: selectedCategory !== '1', avt: profileDataLS?.avatar });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", { sender: PhoneSender, receiver: messagesDataRef.current?.receiver, type: selectedCategory !== '1', avt: profileDataLS?.avatar });
      setIsTyping(false);
    }, 1500);
  };
  const navigate = useNavigate()

  const handleClickNotification = async (purchase: string) => {
    console.log(purchase)
    if (selectedCategory == '4') {
      navigate('/profile/' + purchase + '/false')

    } else {
      navigate('/profile/' + purchase + '/true')
    }
  }

  // Xoá tin nhắn cho riêng mình
  const handleDeleteForMe = async (messageId: string) => {
    try {
      await messagesApi.deleteMessageForMe(messageId, PhoneSender);
      setAllMessages((prev) => prev.filter(m => m._id !== messageId)); // ẩn tin nhắn đã xoá
      toast.success("Đã xoá tin nhắn cho bạn");
    } catch (err) {
      toast.error("Xoá tin nhắn thất bại");
      console.error(err);
    }
  };

  // Thu hồi tin nhắn (chỉ người gửi mới được)
  const handleRecall = async (messageId: string) => {
    try {
      await messagesApi.recallMessage(messageId, PhoneSender);
      setAllMessages((prev) =>
        prev.map((m) =>
          m._id === messageId ? { ...m, is_recalled: true, text: '', url_file: undefined, name_file: undefined } : m
        )
      );
      toast.success("Thu hồi tin nhắn thành công");
    } catch (err) {
      toast.error("Thu hồi tin nhắn thất bại");
      console.error(err);
    }
  };

  const handleDeleteAllMessages = async (
    userPhone: string,
    receiver: string,
    isGroup: boolean
  ) => {
    if (!userPhone || !receiver) return;

    try {
      const res = await messagesApi.deleteAllMessagesForMe(userPhone, receiver, isGroup);
      console.log(res.data);
      toast.success("Đã xoá tất cả tin nhắn cho bạn!");
      setAllMessages([])
    } catch (error: any) {
      console.error("Error deleting all messages:", error);
      alert("Xoá tất cả tin nhắn thất bại!");
    }
  };

  const [isOpen, setIsOpen] = useState(false); // modal mở/tắt
  const [keyword, setKeyword] = useState(""); // từ khoá tìm kiếm
  const [searchKeyword, setsearchKeyword] = useState<IMessage[]>([]); // kết quả tìm kiếm
  const [searchKeyword1, setsearchKeyword1] = useState<IMessage[]>([]); // kết quả tìm kiếm
  const currentUser = PhoneSender; // để xác định "Bạn"
  const handleSearch = async () => {
    if (!keyword.trim()) return;

    try {
      const isGroup = selectedCategory !== '1';
      const results = await messagesApi.searchMessages(
        PhoneSender,
        messagesData?.receiver || '',
        isGroup,
        keyword,
        50 // limit
      );

      setsearchKeyword(results.data); // lưu kết quả
      setIsOpen(true); // mở modal
    } catch (err) {
      console.error("Search failed:", err);
      toast.error("Tìm kiếm thất bại");
    }
  };
  const [isMessageListOpen, setIsMessageListOpen] = useState(false);
  const [messagesList, setMessagesList] = useState<IMessage[]>([]);
  const handleOpenMessage = async (msg: IMessage) => {
    try {
      const timestamp = msg.timestamp ? new Date(msg.timestamp).toISOString() : undefined;

      const isGroup = selectedCategory !== '1';
      const messages = await messagesApi.getMessagesFromDate(
        PhoneSender,
        messagesData?.receiver || '',
        isGroup,
        timestamp || ''  // dùng '' thay vì null
      );
      setIsOpen(false); // ẩn modal search
      setMessagesList(messages.data); // lưu tin nhắn
      setIsMessageListOpen(true); // mở modal list tin nhắn

    } catch (err) {
      console.error(err);
      toast.error("Không thể mở tin nhắn");
    }
  };


  const [currentMedia, setCurrentMedia] = useState<IMessage | null>(null);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const fetchPrevMedia = async () => {
    if (!currentMedia) return;
    setLoadingMedia(true);
    try {
      const res = await messagesApi.getPrevMediaMessage(currentMedia._id!);
      if (res.data) {
        setCurrentMedia(res.data);
      } else {
        toast.info("Không còn media cũ hơn");
      }
    } catch (err) {
      console.error(err);
      // toast.warn("Hết Ảnh rồi");
    } finally {
      setLoadingMedia(false);
    }
  };

  const fetchNextMedia = async () => {
    if (!currentMedia) return;
    setLoadingMedia(true);
    try {
      const res = await messagesApi.getNextMediaMessage(currentMedia._id!);
      if (res.data) {
        setCurrentMedia(res.data);
      } else {
        toast.info("Không còn media mới hơn");
      }
    } catch (err) {
      console.error(err);
      // toast.warn("Hết ảnh rồi");
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleOpenMedia = (msg: IMessage) => {
    if (msg.content_type === "image" || msg.content_type === "video") {
      setCurrentMedia(msg);
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<IMessage | null>(null);
  const [editText, setEditText] = useState("");



  const handleEdit = (msg: IMessage) => {
    setEditingMessage(msg);
    setEditText(msg.text || "");
    setIsEditModalOpen(true);
  };


  const mutationEditMessage = useMutation({
    mutationFn: ({ id, text }: { id: string; text: string }) =>
      messagesApi.editMessage(id, text),
    onSuccess: (res) => {
      setAllMessages((prev) =>
        prev.map((m) => (m._id === res.data._id ? res.data : m))
      );
      toast.success("Đã sửa tin nhắn");
      setIsEditModalOpen(false);
      setEditingMessage(null);
      setEditText("");
    },
    onError: () => {
      toast.error("Sửa tin nhắn thất bại");
    },
  });

const handleReactMessage = async (messageId: string, emoji: string) => {
  if (!profileDataLS) return;
  try {
    // tìm xem user đã react emoji này chưa
    const message = allMessages.find((m) => m._id === messageId);
    const hasReacted = message?.reactions?.some(
      (r) => r.user === profileDataLS.phone && r.emoji === emoji
    );

    let res: AxiosResponse<IMessage>;
    if (hasReacted) {
      // gỡ reaction
      res = await messagesApi.editRemoveReactMessage(messageId, PhoneSender);
    } else {
      // thêm reaction
      res = await messagesApi.editAddreactMessage(
        messageId,
      PhoneSender,
      nameSender,
        emoji
      );
    }

    // cập nhật state
    setAllMessages((prev) =>
      prev.map((m) => (m._id === messageId ? res.data : m))
    );

    // emit socket để realtime
    socket?.emit("message:react", res.data);
  } catch (err) {
    console.error("React message error:", err);
    toast.error("Không thể cập nhật reaction");
  }
};

const [isThemeOpen, setIsThemeOpen] = useState(false);
const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "light";
});

const themes = [
  { id: "light", name: "Sáng", preview: "bg-white border", className: "bg-gray-50 text-gray-800" },
  { id: "dark", name: "Tối", preview: "bg-gray-900", className: "bg-gray-900 text-green" },
  { id: "ocean", name: "Xanh biển", preview: "bg-blue-500", className: "bg-blue-100 text-blue-900" },
  { id: "forest", name: "Xanh lá", preview: "bg-green-500", className: "bg-green-100 text-green-900" },
];

useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    console.log("Loaded theme:", savedTheme);
    setTheme(savedTheme);
  }
}, []);

useEffect(() => {
  console.log("Saving theme:", theme);
  localStorage.setItem("theme", theme);
}, [theme]);


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
          <button onClick={() => handleClickNotification(userData?.user.phone || '0')} className="flex items-center gap-2 text-orange-200">
            <MdChat className="text-2xl text-gray-600" />
            {/* {groupResponse ? `Nhóm: ${groupResponse.name}` : `Bạn: ${userData?.user.name}`} */}
            {groupResponse?.name
              ? `${groupResponse.name}`
              : userData?.user?.name
                ? `${userData.user.name}`
                : ""}

          </button>

          <div className="flex items-center gap-3">
            {/* <button onClick={() => handleVideoCallSFU(PhoneSender, selectedCategory !== '1' ? groupResponse?.id || "" : userData?.user.phone || "")} title="Gọi thoại" className="hover:bg-green-100 p-2 rounded-full"><MdCall className="text-2xl text-gray-600" /></button> */}
            <button onClick={() => handleVideoCall(PhoneSender, selectedCategory !== '1' ? groupResponse?.id || "" : userData?.user.phone || "")} title="Gọi video" className="hover:bg-green-100 p-2 rounded-full"><MdVideoCall className="text-2xl text-gray-600" /></button>
            {/* Thêm nút xoá all tin nhắn */}
            <button
              onClick={() =>
                handleDeleteAllMessages(
                  PhoneSender,
                  selectedCategory !== '1' ? groupResponse?.id || "" : userData?.user.phone || "",
                  selectedCategory !== '1' // isGroup
                )
              }
              title="Xoá tất cả tin nhắn"
              className="hover:bg-red-100 p-2 rounded-full"
            >
              <MdDelete className="text-2xl text-red-600" />
            </button>

            <button
  onClick={() => setIsThemeOpen(true)}
  title="Đổi giao diện"
  className="hover:bg-purple-100 p-2 rounded-full"
>
  🎨
</button>

            <div className="flex items-center gap-3">
              {/* Button tìm kiếm */}
              {/* Button + Input */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSearch} // gọi hàm khi click
                  title="Tìm kiếm tin nhắn"
                  className="hover:bg-blue-100 p-2 rounded-full"
                >
                  🔍
                </button>

                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Nhập từ khoá..."
                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              {isOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  onClick={() => setIsOpen(false)} // click nền đóng modal
                >
                  <div
                    className="bg-white rounded-lg p-4 max-w-md w-full relative"
                    onClick={(e) => e.stopPropagation()} // tránh click trong modal làm đóng
                  >
                    <h3 className="text-lg font-semibold mb-2">Kết quả tìm kiếm</h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-2 right-2 text-red-500"
                    >
                      ✕
                    </button>

                    <div className="max-h-60 overflow-y-auto">
                      {searchKeyword.length === 0 ? (
                        <p className="text-gray-500">Không tìm thấy kết quả</p>
                      ) : (
                        searchKeyword.map((msg, idx) => (
                          <div
                            key={idx}
                            className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleOpenMessage(msg)}
                          >
                            <p className="text-sm font-semibold">{msg.name || msg.sender}</p>
                            <p className="text-sm">{msg.text || msg.name_file}</p>
                            <span className="text-xs text-gray-400">
                              {moment(msg.timestamp).format('HH:mm DD/MM/YYYY')}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {isMessageListOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  onClick={() => setIsMessageListOpen(false)} // click nền để đóng
                >
                  <div
                    className="bg-white rounded-lg p-4 max-w-lg w-full max-h-[80vh] overflow-y-auto relative"
                    onClick={(e) => e.stopPropagation()} // tránh click trong modal làm đóng
                  >
                    <h3 className="text-lg font-semibold mb-2">Tin nhắn</h3>
                    <button
                      onClick={() => setIsMessageListOpen(false)}
                      className="absolute top-2 right-2 text-red-500 text-lg font-bold"
                    >
                      ✕
                    </button>

                    {messagesList.length === 0 ? (
                      <p className="text-gray-500">Không có tin nhắn</p>
                    ) : (
                      <div className="space-y-3">
                        {messagesList.map((msg, idx) => {
                          const isOwnMessage = msg.sender === PhoneSender;
                          return (
                            <div
                              key={idx}
                              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                            >
                              {!isOwnMessage && (
                                <img
                                  src={msg.avt}
                                  alt="avatar"
                                  className="w-8 h-8 rounded-full object-cover mr-2"
                                />
                              )}
                              <div
                                className={`p-2 rounded-lg max-w-[70%] ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                                  }`}
                              >
                                {msg.content_type === 'text' && <span>{msg.text}</span>}
                                {msg.content_type === 'image' && msg.url_file && (
                                  <img src={msg.url_file} className="w-full rounded" alt={msg.name_file} />
                                )}
                                {msg.content_type === 'video' && msg.url_file && (
                                  <video src={msg.url_file} controls className="w-full rounded" />
                                )}
                                {msg.content_type === 'file' && msg.url_file && (
                                  <a
                                    href={msg.url_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-sm block"
                                  >
                                    📎 {msg.name_file}
                                  </a>
                                )}
                                <div className="text-xs text-gray-400 mt-1">
                                  {moment(msg.timestamp).format('HH:mm DD/MM/YYYY')}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}



            </div>

          </div>
        </div>

          
        <div ref={chatBodyRef} style={{ minHeight: '200px' }}   className={`flex-1 overflow-y-auto overflow-x-hidden px-4 py-2 space-y-2 ${themes.find(t => t.id === theme)?.className}`}>
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

                  <div className="flex flex-col max-w-[100%]">
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
                            <div className="flex items-center gap-2 mt-2">
                              {['👍', '❤️', '😂', '😮', '😢', '😡'].map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => handleReactMessage(message._id || "", emoji)}
                                  className="text-lg hover:scale-125 transition-transform"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>

                            {/* Thêm action menu */}
                            <button
                              onClick={() => handleDeleteForMe(message._id || "")}
                              className="text-xs text-red-500 mt-2 hover:underline text-left"
                            >
                              Xoá cho tôi
                            </button>

                            {isOwnMessage && (
                              <button
                                onClick={() => handleRecall(message._id || "")}
                                className="text-xs text-yellow-600 mt-1 hover:underline text-left"
                              >
                                Thu hồi
                              </button>
                            )}
                            {isOwnMessage && (
                              <button
                                onClick={() => handleEdit(message)}
                                className="text-xs text-green-600 mt-1 hover:underline text-left"
                              >
                                Chỉnh sửa tin nhắn
                              </button>
                            )}

                          </div>
                        </div>
                      }
                    >



                      {/* Bubble */}
                      <div
                        className={`p-3 rounded-xl text-sm inline-block break-words leading-relaxed
    ${message.content_type === 'text'
                            ? isOwnMessage
                              ? 'bg-blue-500 text-white max-w-[100%] text-left'
                              : 'bg-white border max-w-[100%] text-left'
                            : message.content_type === 'file'
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
                              onClick={() => handleOpenMedia(message)}
                              alt={message.name_file || 'Image'}
                              // onClick={() => setMediaPreview({ type: 'image', url: message.url_file! })}
                              className="rounded-lg max-w-full w-full max-h-[300px] object-contain"
                            />
                          </div>
                        )}

                        {/* VIDEO CALL */}
                        {message.content_type === 'video_call_signal' && (
                          <div className={`w-full flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                            <div
                              className={`w-full flex items-center gap-2 p-3 rounded-xl shadow-sm
          ${isOwnMessage ? 'bg-green-50 text-green-900' : 'bg-blue-50 text-blue-900'}
        `}
                            >
                              <span className="text-xl">📹</span>
                              <div className="flex flex-col w-full">
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
                              // onClick={() => setMediaPreview({ type: 'video', url: message.url_file! })}
                              onClick={() => handleOpenMedia(message)}
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
                            className="underline text-sm block border mb-1 break-words max-w-[250px]"
                          >
                            📎 {message.name_file}
                          </a>
                        )}

                        {/* TEXT */}
                        {message.content_type === 'text' && message.text && (
                          <div className="">{message.text}</div>
                        )}
                      </div>


                    </Popover>
                    {/* ✅ SHOW REACTIONS */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.reactions.map((reaction, idx) => (
                          <div
                            key={idx}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs flex items-center gap-1 shadow-sm"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-gray-500">{reaction.userName}</span>
                          </div>
                        ))}
                      </div>
                    )}
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { // Shift+Enter vẫn xuống dòng
                e.preventDefault();
                sendTextMessage(textMessage, setTextMessage);
              }
            }}

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

      {currentMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
            <button
              onClick={handleZoomIn}
              className="px-3 py-1 bg-white rounded shadow hover:bg-gray-200"
            >
              ➕ Zoom In
            </button>
            <button
              onClick={handleZoomOut}
              className="px-3 py-1 bg-white rounded shadow hover:bg-gray-200"
            >
              ➖ Zoom Out
            </button>
            <button
              onClick={handleRotate}
              className="px-3 py-1 bg-white rounded shadow hover:bg-gray-200"
            >
              🔄 Rotate
            </button>

          </div>
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setCurrentMedia(null)}
          >
            ✕
          </button>

          {/* Nút trái */}
          <button
            className="absolute left-4 text-white text-3xl"
            onClick={fetchPrevMedia}
            disabled={loadingMedia}
          >
            ⬅
          </button>

          {/* Nội dung media */}
          <div className="max-w-4xl max-h-[80vh]">
            {currentMedia.content_type === "image" && (
              <img style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
              }} src={currentMedia.url_file} alt="" className="max-h-[80vh] mx-auto rounded" />
            )}
            {currentMedia.content_type === "video" && (
              <video style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
              }} src={currentMedia.url_file} controls className="max-h-[80vh] mx-auto rounded" />
            )}
          </div>

          {/* Nút phải */}
          <button
            className="absolute right-4 text-white text-3xl"
            onClick={fetchNextMedia}
            disabled={loadingMedia}
          >
            ➡
          </button>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Chỉnh sửa tin nhắn</h2>
            <textarea
              className="w-full border rounded p-2"
              rows={3}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={() =>
                  mutationEditMessage.mutate({
                    id: editingMessage?._id!,
                    text: editText,
                  })
                }
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

{isThemeOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={() => setIsThemeOpen(false)}
  >
    <div
      className="bg-white rounded-lg p-4 max-w-md w-full relative"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-lg font-semibold mb-2">Chọn giao diện</h3>
      <button
        onClick={() => setIsThemeOpen(false)}
        className="absolute top-2 right-2 text-red-500"
      >
        ✕
      </button>

<div className="grid grid-cols-2 gap-4 mt-4">
  {themes.map((t) => (
    <button
      key={t.id}
      onClick={() => {
        setTheme(t.id);
        setIsThemeOpen(false);
      }}
      className={`p-4 rounded-lg shadow-md flex flex-col items-center gap-2 ${
        theme === t.id ? "ring-2 ring-purple-500" : ""
      }`}
    >
      <div className={`w-12 h-12 rounded-full ${t.preview}`}></div>
      <span className="text-sm">{t.name}</span>
    </button>
  ))}
</div>

    </div>
  </div>
)}

    </div>

  );

}