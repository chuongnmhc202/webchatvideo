// src/socket/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;


export const connectSocket = (userId: string) => {
  if (!socket || !socket.connected) {
    socket = io("http://localhost:8182", {
      query: { userId },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected");
    });

    socket.on("getOnlineUsers", (users: string[]) => {
      console.log("🟢 Users online:", users);
    });

  }
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
