import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { IMessage } from "../types/index";
import { SendMessage } from "@/services/broker.service";
import axios from 'axios';

const app = express();
const server = http.createServer(app);

const SIGNAL_CHANNEL_PREFIX = "signal-room:";
let redisClient: ReturnType<typeof createClient>;

export async function getReceiverSocketIds(userId: string): Promise<string[]> {
  return await redisClient.sMembers(`socket:${userId}`);
}

export async function initializeSocketServer() {
  const pubClient = createClient({
    url: "redis://localhost:6379",
  });
  const subClient = pubClient.duplicate();

  redisClient = createClient({
    url: "redis://localhost:6379",
  });

  await Promise.all([
    redisClient.connect(),
    pubClient.connect(),
    subClient.connect(),
  ]);

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.adapter(createAdapter(pubClient, subClient));
  console.log("✅ Redis adapter connected");

  await subClient.pSubscribe(`${SIGNAL_CHANNEL_PREFIX}*`, async (message, channel) => {
    try {
      const { type, roomId, ...data } = JSON.parse(message);
      const participants = await redisClient.sMembers(`room:${roomId}`);
      for (const participantId of participants) {
        const socketIds = await getReceiverSocketIds(participantId);
        for (const sid of socketIds) {
          io.to(sid).emit(type, { roomId, ...data });
        }
      }
    } catch (err) {
      console.error("❌ Error handling signaling message:", err);
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      await redisClient.sAdd(`socket:${userId}`, socket.id);
      await redisClient.expire(`socket:${userId}`, 60);
      await redisClient.sAdd("online-users", userId);
      console.log(`✅ User ${userId} connected with socket ${socket.id}`);
    }

    const onlineUsers = await redisClient.sMembers("online-users");
    io.emit("getOnlineUsers", onlineUsers);



    socket.on("heartbeat", async () => {
      if (userId) await redisClient.expire(`socket:${userId}`, 60);
    });

    try {
      const response = await axios.get(`http://localhost:8180/api/user/user/group/${userId}`);
      const groupIds: string[] = response.data; // API trả về mảng [1, 3, 5]

      groupIds.forEach(groupId => socket.join(groupId));
      console.log(`📥 ${userId} joined groups:`, groupIds);
    } catch (error) {
      console.error('❌ Failed to load groups via API:', (error as Error).message);
    }

    socket.on("disconnect", async () => {
      if (userId) {
        await redisClient.sRem(`socket:${userId}`, socket.id);
        const socketsLeft = await redisClient.sCard(`socket:${userId}`);
        if (socketsLeft === 0) {
          await redisClient.del(`socket:${userId}`);
          await redisClient.sRem("online-users", userId);
          console.log(`❌ User ${userId} disconnected`);
        } else {

          console.log(`⚠️ Socket ${socket.id} disconnected but user ${userId} still has ${socketsLeft} socket(s)`);
          const receiverSocketIds = await getReceiverSocketIds(userId);
          if (receiverSocketIds.length > 0) {
            for (const sid of receiverSocketIds) {
              socket.broadcast.to(sid).emit("userExit", { id: socket.id });
            }
          }
        }

        const updatedOnlineUsers = await redisClient.sMembers("online-users");
        io.emit("getOnlineUsers", updatedOnlineUsers);
      }
    });

    socket.on("sendMessage", async (message: IMessage) => {
      console.log("📩 Message received:", message);
      await SendMessage(message);

      if (message.is_group) {
        // group message
        const groupId = message.receiver; // receiver chính là groupId nếu là nhóm
        message.status = "delivered";
        socket.to(groupId.toString()).emit("receiveMessage", message);


      } else {
        const receiverSocketIds = await getReceiverSocketIds(message.receiver);
        if (receiverSocketIds.length > 0) {
          message.status = "delivered";
          for (const sid of receiverSocketIds) {
            io.to(sid).emit("receiveMessage", message);
          }
        } else {
          message.status = "sent";
        }
      }



    });

    socket.on("joinRoom", async ({ roomId, userId }) => {
      socket.join(roomId);
      await redisClient.sAdd(`room:${roomId}`, socket.id);
      socket.data.roomId = roomId;
      socket.data.userId = userId;

      const otherUsers = await redisClient.sMembers(`room:${roomId}`);
      const otherSocketIds = otherUsers.filter((id) => id !== socket.id);

      for (const otherId of otherSocketIds) {
        io.to(otherId).emit("new-peer", { socketId: socket.id, userId });
      }

      console.log(`[joinRoom] ${socket.id} joined ${roomId}`);
    });


    socket.on("leaveRoom", async () => {
      const roomId = socket.data.roomId;
      if (roomId) {
        await redisClient.sRem(`room:${roomId}`, socket.id);
        socket.broadcast.to(roomId).emit("peer-left", {
          socketId: socket.id,
        });
        socket.leave(roomId);
        console.log(`[leaveRoom] ${socket.id} left ${roomId}`);
      }
    });



    // socket.on("leaveRoom", async () => {
    //   if (!userId) return;
    //   const roomId = await redisClient.get(`user-room:${userId}`);
    //   if (!roomId) {
    //     socket.emit("leaveRoomFailed", { reason: "You are not in any room." });
    //     return;
    //   }

    //   await redisClient.sRem(`room:${roomId}`, userId);
    //   await redisClient.del(`user-room:${userId}`);
    //   socket.leave(roomId);

    //   const count = await redisClient.sCard(`room:${roomId}`);
    //   if (count === 0) await redisClient.del(`room:${roomId}`);

    //   socket.broadcast.to(roomId).emit("userExit", { id: socket.id });
    //   socket.emit("roomLeft", { roomId });
    // });

    // socket.on("senderOffer", async ({ roomId, targetId, sdp, senderSocketID, callerId, type }) => {
    //   const targetSocketIds = await getReceiverSocketIds(targetId);
    //   for (const sid of targetSocketIds) {
    //     // io.to(sid).emit("incoming-join", { from: senderSocketID });
    //     if (type == 'sent') {
    //       io.to(sid).emit("incoming-join", { roomId, callerId, targetId , senderSocketID});
    //       socket.broadcast.to(roomId).emit("userEnter", { id: senderSocketID });
    //       io.to(senderSocketID).emit("getSenderAnswer", { sdp });
    //       console.log("enter user")
    //     }
    //   }
    // });

    socket.on("offer", async ({ targetSocketId, sdp, type, roomId, callerId, targetId }) => {
      io.to(targetSocketId).emit("offer", {
        sdp,
        from: socket.id,
      });
      console.log({ targetSocketId, sdp, type, roomId, callerId, targetId })
      const targetSocketIds = await getReceiverSocketIds(targetId);
      for (const sid of targetSocketIds) {
        if (type == 'sent') {
          io.to(sid).emit("incoming-join", { roomId, callerId, targetId });
        }
      }
    });


    socket.on("answer", ({ targetSocketId, sdp }) => {
      io.to(targetSocketId).emit("answer", {
        sdp,
        from: socket.id,
      });
    });


    socket.on("senderCandidate", async ({ roomId, candidate }) => {
      const payload = JSON.stringify({
        type: "sender-candidate",
        roomId,
        senderId: userId,
        candidate,
      });
      await pubClient.publish(`${SIGNAL_CHANNEL_PREFIX}${roomId}`, payload);
    });

    socket.on("ice-candidate", ({ targetSocketId, candidate }) => {
      io.to(targetSocketId).emit("ice-candidate", {
        candidate,
        from: socket.id,
      });
    });


    socket.on("receiverOffer", async ({ roomId, sdp, receiverSocketID, senderSocketID }) => {
      const payload = JSON.stringify({
        type: "receiver-offer",
        roomId,
        receiverId: userId,
        sdp,
      });
      io.to(receiverSocketID).emit("getReceiverAnswer", {
        id: senderSocketID,
        sdp,
      });
      await pubClient.publish(`${SIGNAL_CHANNEL_PREFIX}${roomId}`, payload);
    });

    socket.on("receiverCandidate", async ({ roomId, candidate, receiverSocketID, senderSocketID }) => {
      const payload = JSON.stringify({
        type: "receiver-candidate",
        roomId,
        receiverSocketID,
        senderSocketID,
        candidate,
      });
      console.log("receiverCandidate", { roomId, candidate, receiverSocketID, senderSocketID })
      await pubClient.publish(`${SIGNAL_CHANNEL_PREFIX}${roomId}`, payload);
    });
  });
}

export { app, server };
