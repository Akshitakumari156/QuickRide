const socketIO = require("socket.io");

let ioInstance = null;

function initsocket(server) {

  const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
  ];

  ioInstance = socketIO(server, {
    cors: {
      origin: function (origin, callback) {

        if (!origin) {
          return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("Socket.IO CORS blocked"));
      },

      methods: ["GET", "POST"],
      credentials: true
    }
  });

  ioInstance.on("connection", (socket) => {

    console.log(`🔌 New real-time handshake established: ${socket.id}`);

    socket.on("join:room", (data) => {

      if (data && data.roomId) {

        socket.join(data.roomId.toString());

        console.log(
          `📡 Socket ${socket.id} joined room ${data.roomId}`
        );
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ Handshake disconnected: ${socket.id}`);
    });
  });

  return ioInstance;
}

function getIO() {
  return ioInstance;
}

module.exports = {
  initsocket,
  getIO
};