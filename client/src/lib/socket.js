// lib/socket.js
import { io } from 'socket.io-client';

const BASE_URL ='http://localhost:5000';
  

let socket = null;

export const getSocket = () => socket;

export const connectSocket = (userId) => {
  if (!userId) {
    return null;
  }

  if (socket?.connected) return socket;

  socket = io(BASE_URL, {
    query: { userId },
  });

  return socket;
};


export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }
};
