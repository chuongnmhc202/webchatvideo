import {useCallback } from "react";
import { FaMicrophoneSlash, FaMicrophone, FaVideoSlash, FaVideo, FaUsers } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import {
  FaPhoneSlash,
  FaVideo as FaVideoCam
} from "react-icons/fa";

// interface WebRTCUser {
//   id: string;
//   stream: MediaStream;
// }

// const pc_config = {
//   iceServers: [
//     {
//       urls: "stun:stun.l.google.com:19302",
//     },
//   ],
// };

// const VideoCall = () => {
//   const [searchParams] = useSearchParams();
//   const roomId = searchParams.get("roomId");
//   const callerId = searchParams.get("callerId");
//   const receiverId = searchParams.get("receiverId");
//   const type = searchParams.get("type");

//   const { socketReady, socket } = useSocketContext();

//   const [micOn, setMicOn] = useState(true);
//   const [cameraOn, setCameraOn] = useState(true);

//   const localVideo = useRef<HTMLVideoElement>(null);
//   const remoteVideosRef = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [remoteStreams, setRemoteStreams] = useState<WebRTCUser[]>([]);
//   const localStreamRef = useRef<MediaStream>();

//   const sendPCRef = useRef<RTCPeerConnection>();
//   const receivePCsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});

//   useEffect(() => {
//     console.log('URL Parameters:', {
//         roomId,
//         callerId, 
//         receiverId,
//         type
//     });
    
//     if (!roomId) {
//         console.error('Thiếu roomId trong URL');
//         return;
//     }
//   }, [roomId, callerId, receiverId, type]);

//   // Toggle mic
//   const toggleMic = () => {
//     if (localStream) {
//       localStream.getAudioTracks().forEach((track) => (track.enabled = !micOn));
//     }
//     setMicOn(!micOn);
//   };

//   // Toggle camera
//   const toggleCamera = () => {
//     if (localStream) {
//       localStream.getVideoTracks().forEach((track) => (track.enabled = !cameraOn));
//     }
//     setCameraOn(!cameraOn);
//   };

//   // End call
//   const endCall = useCallback(() => {
//     try {
//       // Stop local stream
//       localStream?.getTracks().forEach((track) => track.stop());
      
//       // Close peer connections
//       if (sendPCRef.current) {
//         sendPCRef.current.close();
//         sendPCRef.current = undefined;
//       }
      
//       // Close all receive peer connections
//       Object.values(receivePCsRef.current).forEach(pc => {
//         pc.close();
//       });
//       receivePCsRef.current = {};
      
//       // Clear remote streams
//       setRemoteStreams([]);
      
//       // Leave room
//       if (socket) {
//         socket.emit("leaveRoom", { roomId, id: socket.id });
//       }
      
//       // Close window or redirect
//       if (window.opener) {
//         window.close();
//       } else {
//         window.location.href = '/';
//       }
      
//     } catch (error) {
//       console.error('Lỗi khi kết thúc cuộc gọi:', error);
//       window.location.href = '/';
//     }
//   }, [localStream, socket, roomId]);

//   // Cập nhật srcObject cho remote videos
//   useEffect(() => {
//     remoteStreams.forEach(({ id, stream }) => {
//       const videoEl = remoteVideosRef.current[id];
//       if (videoEl && videoEl.srcObject !== stream) {
//         videoEl.srcObject = stream;
//       }
//     });
//   }, [remoteStreams]);

//   const closeReceivePC = useCallback((id: string) => {
//     if (!receivePCsRef.current[id]) return;
//     receivePCsRef.current[id].close();
//     delete receivePCsRef.current[id];
//   }, []);

//   const createReceiverOffer = useCallback(
//     async (pc: RTCPeerConnection, senderSocketID: string) => {
//       try {
//         const sdp = await pc.createOffer({
//           offerToReceiveAudio: true,
//           offerToReceiveVideo: true,
//         });
//         console.log("create receiver offer success");
//         await pc.setLocalDescription(new RTCSessionDescription(sdp));

//         if (!socket) return;
//         socket.emit("receiverOffer", {
//           roomId: roomId,
//           sdp,
//           receiverSocketID: socket.id,
//           senderSocketID,
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     [socket, roomId]
//   );

//   const createReceiverPeerConnection = useCallback((socketID: string) => {
//     try {
//       const pc = new RTCPeerConnection(pc_config);

//       receivePCsRef.current = { ...receivePCsRef.current, [socketID]: pc };

//       pc.onicecandidate = (e) => {
//         if (!(e.candidate && socket)) return;
//         console.log("receiver PC onicecandidate");
//         socket.emit("receiverCandidate", {
//           roomId: roomId,
//           candidate: e.candidate,
//           receiverSocketID: socket.id,
//           senderSocketID: socketID,
//         });
//       };

//       pc.oniceconnectionstatechange = (e) => {
//         console.log("ICE connection state:", pc.iceConnectionState);
//       };

//       pc.ontrack = (e) => {
//         console.log("ontrack success");
//         setRemoteStreams((oldUsers) =>
//           oldUsers
//             .filter((user) => user.id !== socketID)
//             .concat({
//               id: socketID,
//               stream: e.streams[0],
//             })
//         );
//       };

//       return pc;
//     } catch (e) {
//       console.error(e);
//       return undefined;
//     }
//   }, [socket, roomId]);

//   const createReceivePC = useCallback(
//     (id: string) => {
//       try {
//         console.log(`socketID(${id}) user entered`);
//         const pc = createReceiverPeerConnection(id);
//         if (!(socket && pc)) return;
//         createReceiverOffer(pc, id);
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     [createReceiverOffer, createReceiverPeerConnection, socket]
//   );

//   const createSenderPeerConnection = useCallback(() => {
//     const pc = new RTCPeerConnection(pc_config);

//     pc.onicecandidate = (e) => {
//       if (!(e.candidate && socket)) return;
//       console.log("sender PC onicecandidate");
//       socket.emit("senderCandidate", {
//         roomId: roomId,
//         candidate: e.candidate,
//       });
//     };

//     pc.oniceconnectionstatechange = (e) => {
//       console.log("Sender ICE connection state:", pc.iceConnectionState);
//     };

//     if (localStreamRef.current) {
//       console.log("add local stream");
//       localStreamRef.current.getTracks().forEach((track) => {
//         if (!localStreamRef.current) return;
//         pc.addTrack(track, localStreamRef.current);
//       });
//     } else {
//       console.log("no local stream");
//     }

//     sendPCRef.current = pc;
//   }, [socket, roomId]);

//   const createSenderOffer = useCallback(async () => {
//     try {
//         if (!sendPCRef.current) {
//             console.error('SendPC chưa được tạo');
//             return;
//         }
        
//         if (!socket || !socket.connected) {
//             console.error('Socket chưa kết nối');
//             return;
//         }
        
//         const sdp = await sendPCRef.current.createOffer({
//             offerToReceiveAudio: true,
//             offerToReceiveVideo: true,
//         });
        
//         await sendPCRef.current.setLocalDescription(sdp);
        
//         console.log('Gửi sender offer:', {
//             roomId,
//             receiverId,
//             callerId
//         });
        
//         socket.emit("senderOffer", {
//             roomId: roomId,
//             targetId: receiverId,
//             sdp: sdp,
//             senderSocketID: socket.id,
//             callerId: callerId,
//             type: type
//         });
//     } catch (error) {
//         console.error('Lỗi tạo sender offer:', error);
//     }
//   }, [socket, roomId, receiverId, callerId]);

//   const getLocalStream = useCallback(async () => {
//     try {
//         if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//             throw new Error('Browser không hỗ trợ getUserMedia');
//         }

//         console.log('Requesting media permissions...');
//         const stream = await navigator.mediaDevices.getUserMedia({ 
//             video: true, 
//             audio: true 
//         });
        
//         console.log('Got local stream:', stream);
//         setLocalStream(stream);
//         localStreamRef.current = stream;
        
//         if (localVideo.current) {
//             localVideo.current.srcObject = stream;
//         }
        
//         if (!socket || !socket.id) {
//             console.error('Socket chưa sẵn sàng');
//             return;
//         }
        
//         console.log('Creating sender peer connection...');
//         createSenderPeerConnection();
        
//         console.log('Creating sender offer...');
//         await createSenderOffer();
        
//         console.log('Joining room...', {
//           id: socket.id,
//           roomId: roomId,
//       });
//         socket.emit("joinRoom", {
//             id: socket.id,
//             roomId: roomId,
//         });
        
//     } catch (err: any) {
//         console.error("Lỗi getUserMedia:", err);
//         alert(`Không thể truy cập camera/mic: ${err.message}`);
//     }
//   }, [socket, roomId, createSenderOffer, createSenderPeerConnection]);

//   // Socket connection effect
//   useEffect(() => {
//     if (!socket) return;
    
//     console.log('Socket state:', {
//       connected: socket.connected,
//       id: socket.id
//     });
    
//     if (socket.connected && socket.id) {
//         console.log('Socket ready, getting local stream...');
//         getLocalStream();
//     } else {
//         const handleConnect = () => {
//             console.log('Socket connected:', socket.id);
//             getLocalStream();
//         };
        
//         socket.on('connect', handleConnect);
        
//         return () => {
//             socket.off('connect', handleConnect);
//         };
//     }
//   }, [socket, getLocalStream]);

//   // Socket events effect
//   useEffect(() => {
//     if (!socket) return;
    
//     console.log("Setting up socket listeners for webRTC");

//     // Debug all socket events
//     const handleAnyEvent = (eventName: string, ...args: any[]) => {
//       console.log(`📡 Socket event: ${eventName}`, args);
//     };
//     socket.onAny(handleAnyEvent);

//     const handleUserEnter = (data: { id: string }) => {
//       console.log("👤 userEnter: ", data.id);
//       createReceivePC(data.id);
//     };

//     const handleJoinedRoom = (data: { users: Array<{ id: string }> }) => {
//       console.log("🏠 joinedRoom: ", data.users);
//     };
    
//     const handleUserExit = (data: { id: string }) => {
//       console.log("👋 userExit: ", data.id);
//       closeReceivePC(data.id);
//       setRemoteStreams((users) => users.filter((user) => user.id !== data.id));
//     };

//     const handleGetSenderAnswer = async (data: { sdp: RTCSessionDescriptionInit }) => { // Change type here
//       try {
//         if (!sendPCRef.current) return;
//         console.log("📥 get sender answer");
//         await sendPCRef.current.setRemoteDescription(
//           new RTCSessionDescription(data.sdp) // Now data.sdp is the correct type
//         );
//       } catch (error) {
//         console.error("Error setting sender answer:", error);
//       }
//     };

//     const handleGetSenderCandidate = async (data: { candidate: RTCIceCandidateInit }) => {
//       try {
//         if (!(data.candidate && sendPCRef.current)) return;
//         console.log("📥 get sender candidate");
//         await sendPCRef.current.addIceCandidate(
//           new RTCIceCandidate(data.candidate)
//         );
//         console.log("✅ sender candidate add success");
//       } catch (error) {
//         console.error("Error adding sender candidate:", error);
//       }
//     };

//     const handleGetReceiverAnswer = async (data: { id: string; sdp: RTCSessionDescription }) => {
//       try {
//         console.log(`📥 get socketID(${data.id})'s answer`);
//         const pc: RTCPeerConnection = receivePCsRef.current[data.id];
//         if (!pc) return;
//         await pc.setRemoteDescription(data.sdp);
//         console.log(`✅ socketID(${data.id})'s set remote sdp success`);
//       } catch (error) {
//         console.error("Error setting receiver answer:", error);
//       }
//     };

//     const handleGetReceiverCandidate = async (data: { id: string; candidate: RTCIceCandidateInit }) => {
//       try {
//         console.log(`📥 get socketID(${data.id})'s candidate`);
//         const pc: RTCPeerConnection = receivePCsRef.current[data.id];
//         if (!(pc && data.candidate)) return;
//         await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
//         console.log(`✅ socketID(${data.id})'s candidate add success`);
//       } catch (error) {
//         console.error("Error adding receiver candidate:", error);
//       }
//     };

//     // Attach listeners
//     socket.on("userEnter", handleUserEnter);
//     socket.on("joinedRoom", handleJoinedRoom);
//     socket.on("userExit", handleUserExit);
//     socket.on("getSenderAnswer", handleGetSenderAnswer);
//     socket.on("getSenderCandidate", handleGetSenderCandidate);
//     socket.on("getReceiverAnswer", handleGetReceiverAnswer);
//     socket.on("getReceiverCandidate", handleGetReceiverCandidate);

//     return () => {
//       console.log("🧹 Cleaning up socket listeners");
//       socket.offAny(handleAnyEvent);
//       socket.off("userEnter", handleUserEnter);
//       socket.off("joinedRoom", handleJoinedRoom);
//       socket.off("userExit", handleUserExit);
//       socket.off("getSenderAnswer", handleGetSenderAnswer);
//       socket.off("getSenderCandidate", handleGetSenderCandidate);
//       socket.off("getReceiverAnswer", handleGetReceiverAnswer);
//       socket.off("getReceiverCandidate", handleGetReceiverCandidate);
      
//       // Cleanup peer connections
//       if (sendPCRef.current) {
//         sendPCRef.current.close();
//       }
//       Object.values(receivePCsRef.current).forEach(pc => pc.close());
//     };
//   }, [socket, closeReceivePC, createReceivePC]);

//   return (
//     <div>
//       <div className="flex flex-col h-screen bg-gray-900 text-white">
//         <div className="flex-1 relative flex flex-wrap gap-2 p-2 overflow-auto">
//           {/* Remote video nhóm */}
//           {remoteStreams.length === 0 && (
//             <div className="text-center w-full mt-10">
//               Đang kết nối... {localStream ? "📹 Camera đã sẵn sàng" : "📹 Đang khởi tạo camera"}
//             </div>
//           )}

//           {remoteStreams.map(({ id }) => (
//             <video
//               key={id}
//               ref={(el) => (remoteVideosRef.current[id] = el)}
//               autoPlay
//               playsInline
//               className="w-60 h-60 bg-black rounded-lg object-cover"
//             />
//           ))}

//           {/* Local video */}
//           <video
//             ref={localVideo}
//             autoPlay
//             muted
//             playsInline
//             className="w-40 h-40 absolute bottom-4 right-4 rounded-lg border-2 border-white shadow-lg object-cover"
//           />
//         </div>

//         {/* Control Buttons */}
//         <div className="flex justify-center gap-4 bg-black bg-opacity-50 p-3 rounded-t-lg">
//           <button onClick={toggleMic} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
//             {micOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
//           </button>
//           <button onClick={toggleCamera} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
//             {cameraOn ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
//           </button>
//           <button onClick={endCall} className="p-2 bg-red-600 hover:bg-red-700 rounded-full">
//             <FaPhoneSlash size={20} />
//           </button>
//           <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
//             <FaUsers size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCall;


import React, { useEffect, useRef, useState } from "react";
import { useSocketContext } from 'src/contexts/SocketContext'


const VideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

    const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const callerId = searchParams.get("callerId");
  const receiverId = searchParams.get("receiverId");
  const type = searchParams.get("type");

  const [userId] = useState("user-" + Math.floor(Math.random() * 1000));

  const localStream = useRef<MediaStream | null>(null);

  const { socketReady, socket } = useSocketContext();

  const ICE_SERVERS = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      // TURN server ở đây nếu có
    ],
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(ICE_SERVERS);

    pc.onicecandidate = (e) => {
      if (e.candidate && socket) {
        socket.emit("ice-candidate", {
          targetSocketId: remoteSocketId.current,
          candidate: e.candidate,
        });
      }
    };

    pc.ontrack = (e) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }
    };

    return pc;
  };

  const remoteSocketId = useRef<string | null>(null);

  useEffect(() => {
    const init = async () => {
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream.current;
      }
      if (!socket) return

      socket.emit("joinRoom", { roomId, userId });
    };

    init();
    if (!socket) return

    socket.on("new-peer", async ({ socketId }) => {
      remoteSocketId.current = socketId;

      peerConnection.current = createPeerConnection();

      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, localStream.current!);
        });
      }

      const offer = await peerConnection.current?.createOffer();
      await peerConnection.current?.setLocalDescription(offer!);

      if (!socket) return

      socket.emit("offer", {
        targetSocketId: socketId,
        sdp: offer,
        type,
        roomId,
        callerId,
        targetId: receiverId,
      });
    });
    if (!socket) return
    

    socket.on("offer", async ({ sdp, from }) => {
      remoteSocketId.current = from;

      peerConnection.current = createPeerConnection();

      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, localStream.current!);
        });
      }

      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(sdp));

      const answer = await peerConnection.current?.createAnswer();
      await peerConnection.current?.setLocalDescription(answer!);

      socket.emit("answer", {
        targetSocketId: from,
        sdp: answer,
      });
    });

    socket.on("answer", async ({ sdp }) => {
      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (candidate) {
        await peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socket.on("peer-left", () => {
      remoteSocketId.current = null;
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
      peerConnection.current?.close();
      peerConnection.current = null;
    });

    return () => {
      socket.emit("leaveRoom");
      peerConnection.current?.close();
    };
  }, [socket]);

    const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

    // Toggle mic
  const toggleMic = () => {
    if (localStream) {
      // localVideoRef.getAudioTracks().forEach((track) => (track.enabled = !micOn));
    }
    setMicOn(!micOn);
  };

  // Toggle camera
  const toggleCamera = () => {
    if (localStream) {
      // localStream.getVideoTracks().forEach((track) => (track.enabled = !cameraOn));
    }
    setCameraOn(!cameraOn);
  };

  // const endCall = useCallback(() => {

  // })

  return (
    // <div className="flex gap-4 p-4 justify-center">
    //   <div>
    //     <p className="text-center">You</p>
    //     <video ref={localVideoRef} autoPlay playsInline muted className="rounded shadow w-64 h-48 bg-black" />
    //   </div>
    //   <div>
    //     <p className="text-center">Remote</p>
    //     <video ref={remoteVideoRef} autoPlay playsInline className="rounded shadow w-64 h-48 bg-black" />
    //   </div>
    // </div>



    <div>
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <div className="flex-1 relative flex flex-wrap gap-2 p-2 overflow-auto">
          {/* Remote video nhóm */}


            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-60 h-60 bg-black rounded-lg object-cover"
            />


          {/* Local video */}
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-40 h-40 absolute bottom-4 right-4 rounded-lg border-2 border-white shadow-lg object-cover"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 bg-black bg-opacity-50 p-3 rounded-t-lg">
          <button onClick={toggleMic} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
            {micOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
          </button>
          <button onClick={toggleCamera} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
            {cameraOn ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
          </button>
          <button className="p-2 bg-red-600 hover:bg-red-700 rounded-full">
            <FaPhoneSlash size={20} />
          </button>
          <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
            <FaUsers size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
