import http from "http";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import { InitializeBroker } from "./services/broker.service";
import { initializeSocketServer } from "./socket/socket";
import { initializeVideoSocketServer } from "./socket/video-socket-server";

dotenv.config();

const app = express();
const server = http.createServer(app);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";


async function bootstrap() {
  app.use(express.json());
  app.use(cookieParser());

  app.use(cors({
    origin: "*",
    credentials: true,
  }));

  app.get("/api/socket/check", (req, res) => {
  res.status(200).json({
    message: "socket-service is running"
  });
});


  const io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
    path: "/api/socket",
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  await InitializeBroker();
await initializeSocketServer(io);        // 🔄 Truyền io
await initializeVideoSocketServer(io);   // 🔄 Truyền io (dùng io.of("/video-socket"))

const PORT = process.env.PORT || 8182;

  server.listen(PORT, () => {
    console.log(`🚀 Socket service listening on port ${PORT}`);
  });
}

bootstrap().catch(console.error);
