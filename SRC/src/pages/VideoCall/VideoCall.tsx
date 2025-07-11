import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FaMicrophoneSlash,
  FaMicrophone,
  FaVideoSlash,
  FaVideo,
  FaUsers,
  FaPhoneSlash,
} from "react-icons/fa";
import {
  connectVideoSocket,
  getVideoSocket,
  disconnectVideoSocket,
} from "src/socket/videoSocket";

const ICE_SERVERS = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const VideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});
  const localStream = useRef<MediaStream | null>(null);

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const receiverId = searchParams.get("receiverId");
  const isGroup = searchParams.get("isGroup") === "true";
  const [userId] = useState("user-" + Math.floor(Math.random() * 1000));

  useEffect(() => {
    connectVideoSocket(userId);
    return () => {
      disconnectVideoSocket();
    };
  }, [userId]);

  useEffect(() => {
    const socket = getVideoSocket();
    if (!socket) return;

    const init = async () => {
      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) localVideoRef.current.srcObject = localStream.current;
      } catch (err) {
        console.error("Cannot access media devices:", err);
        alert("Cannot access camera or microphone.");
        return;
      }

      socket.emit("joinRoom", { roomId: isGroup ? receiverId : roomId, userId, isGroup });
    };

    init();

    socket.on("new-peer", async ({ socketId }) => {
      const pc = new RTCPeerConnection(ICE_SERVERS);
      peerConnections.current[socketId] = pc;

      localStream.current?.getTracks().forEach((track) => pc.addTrack(track, localStream.current!));

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("ice-candidate", { targetSocketId: socketId, candidate: e.candidate });
        }
      };

      pc.ontrack = (e) => {
        setRemoteStreams((prev) => ({ ...prev, [socketId]: e.streams[0] }));
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("offer", { targetSocketId: socketId, sdp: offer });
    });

    socket.on("offer", async ({ sdp, from }) => {
      const pc = new RTCPeerConnection(ICE_SERVERS);
      peerConnections.current[from] = pc;

      localStream.current?.getTracks().forEach((track) => pc.addTrack(track, localStream.current!));

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("ice-candidate", { targetSocketId: from, candidate: e.candidate });
        }
      };

      pc.ontrack = (e) => {
        setRemoteStreams((prev) => ({ ...prev, [from]: e.streams[0] }));
      };

      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("answer", { targetSocketId: from, sdp: answer });
    });

    socket.on("answer", async ({ sdp, from }) => {
      const pc = peerConnections.current[from];
      if (pc) await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socket.on("ice-candidate", async ({ candidate, from }) => {
      const pc = peerConnections.current[from];
      if (pc && candidate) await pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("peer-left", ({ socketId }) => {
      const pc = peerConnections.current[socketId];
      if (pc) pc.close();
      delete peerConnections.current[socketId];
      setRemoteStreams((prev) => {
        const copy = { ...prev };
        delete copy[socketId];
        return copy;
      });
    });

    return () => {
      socket.emit("leaveRoom");
      socket.removeAllListeners();

      Object.values(peerConnections.current).forEach((pc) => pc.close());
      peerConnections.current = {};
      setRemoteStreams({});
    };
  }, [roomId, userId, isGroup, receiverId]);

  const toggleMic = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => (track.enabled = !micOn));
      setMicOn((prev) => !prev);
    }
  };

  const toggleCamera = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach((track) => (track.enabled = !cameraOn));
      setCameraOn((prev) => !prev);
    }
  };

  const leaveCall = () => {
    const socket = getVideoSocket();
    socket?.emit("leaveRoom");
    socket?.removeAllListeners();

    Object.values(peerConnections.current).forEach((pc) => pc.close());
    peerConnections.current = {};

    disconnectVideoSocket();
    window.close();
  };

  const remoteStreamCount = Object.keys(remoteStreams).length;

  return (
<div className="flex flex-col h-screen bg-gray-900 text-white">
  {/* Video Grid */}
  <div className="flex-1 relative p-2">
    <div
      className="grid gap-2 h-full"
      style={{
        gridTemplateColumns:
          remoteStreamCount === 1 ? "1fr" :
          remoteStreamCount === 2 ? "1fr 1fr" :
          remoteStreamCount === 3 ? "1fr 1fr 1fr" :
          remoteStreamCount === 4 ? "1fr 1fr" :
          "repeat(auto-fit, minmax(200px, 1fr))"
      }}
    >
      {/* Remote videos */}
      {Object.entries(remoteStreams).map(([peerId, stream]) => (
        <video
          key={peerId}
          autoPlay
          playsInline
          ref={(video) => {
            if (video) video.srcObject = stream;
          }}
          className="w-full h-full bg-black rounded-lg object-cover"
        />
      ))}
    </div>

    {/* Local video - nhỏ ở góc dưới bên phải */}
    <video
      ref={localVideoRef}
      autoPlay
      muted
      playsInline
      className="w-40 h-40 absolute bottom-4 right-4 bg-black rounded-lg border-2 border-white shadow-lg object-cover"
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
    <button onClick={leaveCall} className="p-2 bg-red-600 hover:bg-red-700 rounded-full">
      <FaPhoneSlash size={20} />
    </button>
    <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
      <FaUsers size={20} />
    </button>
  </div>
</div>


  );
};

export default VideoCall;
