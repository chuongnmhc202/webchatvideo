import { useEffect, useState, useRef} from "react";
import { useSocketContext } from "src/contexts/SocketContext";
import { IMessage } from "src/types/utils.type";
import { toast } from "react-toastify";
import { FaPhoneSlash, FaVideo as FaVideoCam } from "react-icons/fa";
import { createPortal } from "react-dom";
import axios from 'axios';
import { User } from 'src/types/user.type';
import { useQuery } from '@tanstack/react-query';



export default function SocketListeners() {
  const { socket, socketReady } = useSocketContext();

  const ringtoneRef = useRef<HTMLAudioElement | null>(null);

    const { data: profileDataLSLC, refetch } = useQuery<User>({
      queryKey: ['profile'],
      queryFn: async () => {
        const raw = localStorage.getItem('profile');
        if (!raw) throw new Error('No profile found in localStorage');
        return JSON.parse(raw) as User;
      },
    });

  const sendSignalMessage = async (message: IMessage) => {

    try {
      const apiUrl = import.meta.env.VITE_API_URL_DEV_CHAT ?? 'http://localhost:8181';
      const response = await axios.post(`${apiUrl}/api/chat/message/send`, message);
      console.log("✅ Message sent:", response.data);
    } catch (err) {
      console.error("❌ Failed to send signal message:", err);
    }
  };

  useEffect(() => {
    if (!socketReady || !socket) {
      console.log("⛔ socket not ready");
      return;
    }


    const handleReceive = (msg: IMessage) => {
      console.log("📥 Tin nhắn đến:", msg);

      if (msg.is_group) {
        // 🔔 Tin nhắn nhóm
        toast.success(`👥 Tin nhắn mới trong nhóm #${msg.receiver} từ ${msg.sender}`);
      } else {
        // 💬 Tin nhắn cá nhân
        toast.success(`📩 Tin nhắn mới từ SĐT: ${msg.sender}`);
      }
    };


    socket.on("receiveMessage", handleReceive);

    socket.on("join-room-call-receive", (data) => {
      console.log("🔥 openModal-receive received", data);
      setIncomingCall(data)
    });

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [socket, socketReady]);

        const [incomingCall, setIncomingCall] = useState<null | { roomId: string, callerId: string, receiverId: string, isGroup: number, name: string, avt: string}>(null);
      

        

        const acceptCall = async () => {
          setIncomingCall(null);
          // Join room and setup media (already handled in useEffect)


                        await sendSignalMessage({
              sender: incomingCall?.receiverId || '',
              receiver: incomingCall?.callerId || '',
              is_group: incomingCall?.isGroup === 1,
              content_type: 'video_call_signal',
              type_video_call: "answer",
              text: "🔴 Tham gia cuộc gọi",
              timestamp: new Date().toISOString(),
              avt : profileDataLSLC?.avatar,
              name: profileDataLSLC?.name
            });


          const url = `/call?roomId=${incomingCall?.roomId}&callerId=${incomingCall?.callerId}&receiverId=${incomingCall?.receiverId}&type=receive&isGroup=${incomingCall?.isGroup}`;
          window.open(
            url,
            "_blank",
            "popup=yes,width=1000,height=700,left=200,top=100,resizable=no"
          );
        };
      
        const declineCall = () => {
          setIncomingCall(null);
        };

useEffect(() => {
  if (incomingCall) {
    if (!ringtoneRef.current) {
      ringtoneRef.current = new Audio("https://firebasestorage.googleapis.com/v0/b/uploadingfile-4ee57.appspot.com/o/files%2Fbutton-8.mp3?alt=media&token=6d1b928d-9be4-40ec-a4eb-53196755164e");
      ringtoneRef.current.loop = true;
    }

    ringtoneRef.current.play().catch((err) => {
      console.warn("🔇 Không thể phát chuông:", err);
    });
  } else {
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
  }
}, [incomingCall]);



  return (
    <div> 

{incomingCall  && createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-xl shadow-xl text-center w-80">
              <h2 className="text-lg font-semibold mb-2">Incoming call</h2>
              <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden">
                <img src={incomingCall.avt} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <p className="font-bold text-lg">{incomingCall.name} is calling you</p>
              <p className="text-gray-500 text-sm mt-1 mb-4">🔒 End-to-end encrypted</p>
              <div className="flex justify-center gap-6">
                <button onClick={declineCall} className="bg-red-600 hover:bg-red-700 p-3 rounded-full">
                  <FaPhoneSlash size={20} color="white" />
                </button>
                <button onClick={acceptCall} className="bg-green-500 hover:bg-green-600 p-3 rounded-full">
                  <FaVideoCam size={20} color="white" />
                </button>
              </div>
              <button onClick={declineCall} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
