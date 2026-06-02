// Backend/sockets/index.js
const socketIO = require("socket.io");

let ioInstance = null;

/**
 * @desc    Initialize real-time WebSockets gateway and configure cross-origin limits
 * @param   {Object} server - Native Node.js HTTP server instance initialized in server.js
 * @returns {Object} Configured Socket.io Server instance
 */
function initsocket(server) {
  ioInstance = socketIO(server, {
    cors: {
      origin: "http://localhost:5173", // Matches your React Vite frontend port precisely
      methods: ["GET", "POST"]
    }
  });

  ioInstance.on("connection", (socket) => {
    console.log(`🔌 New real-time handshake established: ${socket.id}`);

    // Room registration pipeline so users can receive events by their database IDs
    socket.on("join:room", (data) => {
      if (data && data.roomId) {
        socket.join(data.roomId.toString());
        console.log(`📡 Socket ${socket.id} successfully joined room channel: ${data.roomId}`);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ Handshake disconnected: ${socket.id}`);
    });
  });

  return ioInstance; // 🎯 Returns instance to server.js
}

function getIO() {
  return ioInstance;
}

module.exports = {
  initsocket,
  getIO
};