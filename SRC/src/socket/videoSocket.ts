// src/socket/videoSocket.ts
import { io, Socket } from "socket.io-client";

let videoSocket: Socket | null = null;

export function connectVideoSocket(userId: string) {
  if (!videoSocket) {
    videoSocket = io("ws://localhost:8182/video-socket", {
      query: { userId },
    });

    videoSocket.on("connect", () => {
      console.log("✅ Video socket connected:", videoSocket?.id);
    });

    videoSocket.on("disconnect", () => {
      console.log("❌ Video socket disconnected");
    });
  }
}

export function getVideoSocket(): Socket | null {
  return videoSocket;
}

export function disconnectVideoSocket() {
  if (videoSocket) {
    videoSocket.disconnect();
    videoSocket = null;
  }
}
