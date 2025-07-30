import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMessage } from 'src/types/utils.type';
import { useQuery, useMutation } from '@tanstack/react-query';
import { User } from 'src/types/user.type';

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
import axios from "axios";


const ICE_SERVERS = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:ss-turn1.xirsys.com"], // STUN Google cho fallback
      
    },
    {
      username: "WoYy6uWAwk4D__Bl1G_0Q2UXPnZglntrbo21uIAcktSj_RGKrnY7-7XcMt44TuClAAAAAGiDPoBuZ3V5ZW50YW50aGFuaDA3MDlpdA==",
      credential: "57e09e0c-6930-11f0-a63c-0242ac140004",
      urls: [
        "turn:ss-turn1.xirsys.com:80?transport=udp",
        "turn:ss-turn1.xirsys.com:3478?transport=udp",
        "turn:ss-turn1.xirsys.com:80?transport=tcp",
        "turn:ss-turn1.xirsys.com:3478?transport=tcp",
        "turns:ss-turn1.xirsys.com:443?transport=tcp",
        "turns:ss-turn1.xirsys.com:5349?transport=tcp",
      ],
    },
  ],
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
  const callerId = searchParams.get("callerId");
  const isGroup = searchParams.get("isGroup") === "1";
  const type = searchParams.get("type");
  const [userId] = useState("user-" + Math.floor(Math.random() * 1000));

    const { data: profileDataLS, refetch } = useQuery<User>({
      queryKey: ['profile'],
      queryFn: async () => {
        const raw = localStorage.getItem('profile');
        if (!raw) throw new Error('No profile found in localStorage');
        return JSON.parse(raw) as User;
      },
    });



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
  }, [roomId, userId, isGroup, receiverId, profileDataLS, callerId  ]);

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

  // Xác định layout theo số lượng
const renderRemoteVideos = () => {
  const entries = Object.entries(remoteStreams);
  const count = entries.length;

  if (count === 1) {
    // 1 video: full screen
    return (
      <div className="w-full h-full">
        <video
          autoPlay
          playsInline
          ref={(video) => video && (video.srcObject = entries[0][1])}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-2 h-full">
        {entries.map(([peerId, stream]) => (
          <div key={peerId} className="w-full h-full bg-black rounded-lg overflow-hidden">
            <video
              autoPlay
              playsInline
              ref={(video) => video && (video.srcObject = stream)}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="grid grid-rows-2 gap-2 h-full">
        <div className="grid grid-cols-2 gap-2">
          {entries.slice(0, 2).map(([peerId, stream]) => (
            <div key={peerId} className="w-full h-full bg-black rounded-lg overflow-hidden">
              <video
                autoPlay
                playsInline
                ref={(video) => video && (video.srcObject = stream)}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center h-full">
          <div className="w-1/2 h-full bg-black rounded-lg overflow-hidden">
            <video
              autoPlay
              playsInline
              ref={(video) => video && (video.srcObject = entries[2][1])}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  // >= 4: chia 2x2, 2x3,...
  return (
    <div
      className="grid gap-2 h-full"
      style={{
        gridTemplateColumns: "repeat(2, 1fr)",
        gridAutoRows: "1fr",
      }}
    >
      {entries.map(([peerId, stream]) => (
        <div key={peerId} className="w-full h-full bg-black rounded-lg overflow-hidden">
          <video
            autoPlay
            playsInline
            ref={(video) => video && (video.srcObject = stream)}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};


  return (
<div className="flex flex-col h-screen bg-gray-900 text-white">
  {/* Video area */}
  <div className="relative flex-1 p-2 overflow-hidden">
    {/* Remote grid */}
 {renderRemoteVideos()}
    {/* Local video fixed at bottom right */}
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
