// src/socket/videoSocket.ts
import { io, Socket } from "socket.io-client";

let videoSocket: Socket | null = null;

export function connectVideoSocket(userId: string) {
  if (!videoSocket) {
    const env = (window as any).env;
    const apiUrl = env?.VITE_API_URL_DEV_SOCKET ?? 'http://localhost:8182';
    // http://localhost:3000/
    videoSocket = io(`${apiUrl}/video-socket`, {
      path: "/api/socket",
      query: { userId },
      transports: ["websocket"], // ưu tiên WebSocket
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
