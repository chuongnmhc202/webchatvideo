import { useEffect, useState } from "react";
import { useSocketContext } from "src/contexts/SocketContext";
import { IMessage } from "src/types/utils.type";
import { toast } from "react-toastify";
import { FaPhoneSlash, FaVideo as FaVideoCam } from "react-icons/fa";
import { createPortal } from "react-dom";

export default function SocketListeners() {
  const { socket, socketReady } = useSocketContext();

  useEffect(() => {
    if (!socketReady || !socket) {
      console.log("⛔ socket not ready");
      return;
    }


    const handleReceive = (msg: IMessage) => {
      console.log("📥 Tin nhắn đến:", msg);
      toast.success(`📩 Có tin nhắn đến từ SĐT: ${msg.sender}`);
    };

    socket.on("receiveMessage", handleReceive);

    socket.on("incoming-join", (data) => {
      console.log("🔥 openModal-receive received", data);
      setIncomingCall(data)
    });

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [socket, socketReady]);

        const [incomingCall, setIncomingCall] = useState<null | { roomId: string, callerId: string, targetId: string, senderSocketID: string }>(null);
      
        const acceptCall = () => {
          setIncomingCall(null);
          // Join room and setup media (already handled in useEffect)
          const url = `/call?roomId=${incomingCall?.roomId}&callerId=${incomingCall?.callerId}&receiverId=${incomingCall?.targetId}&type=receive`;
          window.open(
            url,
            "_blank",
            "popup=yes,width=1000,height=700,left=200,top=100,resizable=no"
          );
        };
      
        const declineCall = () => {
          setIncomingCall(null);
          // Optional: Notify caller
        };

  return (
    <div> 

{incomingCall  && createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-xl shadow-xl text-center w-80">
              <h2 className="text-lg font-semibold mb-2">Incoming call</h2>
              <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden">
                <img src="https://via.placeholder.com/100" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <p className="font-bold text-lg">{incomingCall.callerId} is calling you</p>
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
