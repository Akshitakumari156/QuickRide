import { io } from "socket.io-client";

// Replaced hardcoded localhost string with global environment configuration base fallback URL
const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
  withCredentials: true
});

socket.on("connect", () => {
  console.log("🟢 Socket connected with ID:", socket.id);
});

export default socket;