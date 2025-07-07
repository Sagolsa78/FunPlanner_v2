// lib/socket.js
import { io } from 'socket.io-client';

const BASE_URL =`${import.meta.env.VITE_BACKEND_URL}`;
  

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
