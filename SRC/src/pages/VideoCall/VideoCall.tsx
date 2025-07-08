import {useCallback } from "react";
import { FaMicrophoneSlash, FaMicrophone, FaVideoSlash, FaVideo, FaUsers } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import {
  FaPhoneSlash,
  FaVideo as FaVideoCam
} from "react-icons/fa";

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
