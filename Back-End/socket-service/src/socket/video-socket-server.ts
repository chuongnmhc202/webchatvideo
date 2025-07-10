import { Server } from "socket.io";



export async function initializeVideoSocketServer(io: Server) {

  const videoIo = io.of("/video-socket");



  console.log("🎥 Video socket namespace: /video-socket");

  videoIo.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;
    console.log(`🎥 [Video] ${userId} connected (${socket.id})`);

    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
      socket.data = { roomId, userId };
      const room = videoIo.adapter.rooms.get(roomId) ?? new Set();
      [...room].filter(id => id !== socket.id).forEach(id => {
        videoIo.to(id).emit("new-peer", { socketId: socket.id, userId });
      });
      console.log("join room", { roomId, userId } )
    });

    socket.on("offer", ({ targetSocketId, sdp }) => {
      videoIo.to(targetSocketId).emit("offer", { sdp, from: socket.id });
    });

    socket.on("answer", ({ targetSocketId, sdp }) => {
      videoIo.to(targetSocketId).emit("answer", { sdp, from: socket.id });
    });

    socket.on("ice-candidate", ({ targetSocketId, candidate }) => {
      videoIo.to(targetSocketId).emit("ice-candidate", { candidate, from: socket.id });
    });

    socket.on("leaveRoom", () => {
      const { roomId } = socket.data;
      if (roomId) {
        socket.broadcast.to(roomId).emit("peer-left", { socketId: socket.id });
        socket.leave(roomId);
      }
    });

    socket.on("disconnect", () => {
      const { roomId } = socket.data;
      if (roomId) {
        socket.broadcast.to(roomId).emit("peer-left", { socketId: socket.id });
      }
      console.log(`❌ [Video] ${userId} disconnected`);
    });
  });
}
