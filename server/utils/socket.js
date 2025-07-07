import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", // for dev
      "https://fun-planner.vercel.app/", // update this to your real Vercel frontend URL
      "https://fun-planner-v2-git-master-omguptatech-gmailcoms-projects.vercel.app" // if you're testing preview branches
    ],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.join(userId); // ✅ join room named by userId
  }

  // Notify all clients of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
  console.log("A user disconnected", socket.id);

  // Make sure only the correct userId is removed
  Object.keys(userSocketMap).forEach((key) => {
    if (userSocketMap[key] === socket.id) {
      delete userSocketMap[key];
    }
  });

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
});
});


export { io, app, server };