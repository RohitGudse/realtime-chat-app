import { io } from "socket.io-client";

const getSocketUrl = () => {
  return import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
};

export const socket = io(getSocketUrl(), {
  transports: ["websocket"],
  autoConnect: true,
});