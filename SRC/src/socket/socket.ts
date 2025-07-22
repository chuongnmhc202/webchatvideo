// src/socket/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let heartbeatInterval: NodeJS.Timeout | null = null;

export const connectSocket = (userId: string) => {
  const apiUrl = import.meta.env.VITE_API_URL_DEV_SOCKET ?? 'http://localhost:8182';
  if (!socket || !socket.connected) {
    socket = io(apiUrl, {
      query: { userId },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected");

      // Gửi heartbeat mỗi 30 giây
      if (heartbeatInterval) clearInterval(heartbeatInterval); // clear nếu trước đó đã tồn tại
      heartbeatInterval = setInterval(() => {
        if (socket && socket.connected) {
          socket.emit("heartbeat");
          console.log("🔁 heartbeat sent");
        }
      }, 30_000);
    });

    socket.on("getOnlineUsers", (users: string[]) => {
      console.log("🟢 Users online:", users);
    });
  }
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
