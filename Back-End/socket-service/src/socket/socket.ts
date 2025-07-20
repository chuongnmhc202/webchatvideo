
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { IMessage } from "../types/index";
import { SendMessage } from "../services/broker.service";
import axios from 'axios';
import * as dotenv from "dotenv";
dotenv.config();

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const USER_SERVICE_BASE_URL = process.env.USER_SERVICE_BASE_URL || "http://localhost:8180";
const CHAT_SERVICE_BASE_URL = process.env.CHAT_SERVICE_BASE_URL || "http://localhost:8181";

const SIGNAL_CHANNEL_PREFIX = "signal-room:";
let redisClient: ReturnType<typeof createClient>;

export async function getReceiverSocketIds(userId: string): Promise<string[]> {
  return await redisClient.sMembers(`socket:${userId}`);
}

export async function initializeSocketServer(io: Server) {
  const pubClient = createClient({
    url: REDIS_URL,
  });
  const subClient = pubClient.duplicate();

  redisClient = createClient({
    url: REDIS_URL,
  });

  await Promise.all([
    redisClient.connect(),
    pubClient.connect(),
    subClient.connect(),
  ]);

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
      if (userId) {
        await redisClient.expire(`socket:${userId}`, 60); // 60s timeout
      }
    });


    try {
      const response = await axios.get(`${USER_SERVICE_BASE_URL}/api/user/user/group/${userId}`);
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

    socket.on("logout", async () => {
      if (userId) {
        await redisClient.del(`socket:${userId}`);
        await redisClient.sRem("online-users", userId);
        console.log(`👋 User ${userId} logged out manually`);

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
          // nếu người dùng off thì tạo thông báo
            try {
            await axios.post(`${CHAT_SERVICE_BASE_URL}/api/chat/notification/send`, {
              type: "message",
              content: `${message.sender} đã gửi bạn một tin nhắn.`,
              sender: message.sender,
              receiver: message.receiver,
              is_group: false,
            });
          } catch (error) {
            console.error("Failed to send notification:", error);
          }
        }
      }



    });

    socket.on("join-room-call-sent", async (payload: { roomId: string, callerId: string, receiverId: string, isGroup: number }) => {
      const { roomId, callerId, receiverId, isGroup } = payload;
      console.log("📩 Message received:", { roomId, callerId, receiverId, isGroup });

      if (isGroup == 0) {
        const targetSocketIds = await getReceiverSocketIds(receiverId);
  
        for (const sid of targetSocketIds) {
          io.to(sid).emit("join-room-call-receive",  {roomId, callerId, receiverId, isGroup});
        }
      } else {
        const groupId = receiverId; // receiver chính là groupId nếu là nhóm
        socket.to(groupId.toString()).emit("join-room-call-receive", {roomId, callerId, receiverId, isGroup});
      }

    });



  });

}