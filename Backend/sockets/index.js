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

  const jwt = require("jsonwebtoken");
  const captainModel = require("../models/captain.model");
  const userModel = require("../models/user.model");
  const driverHandler = require("./driverHandler");

  ioInstance.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next();

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const captain = await captainModel.findById(decoded._id);
      if (captain) {
        socket.role = "driver";
        socket.userId = captain._id.toString();
        return next();
      }

      const user = await userModel.findById(decoded._id);
      if (user) {
        socket.role = "passenger";
        socket.userId = user._id.toString();
        return next();
      }

      return next();
    } catch (err) {
      return next();
    }
  });

  ioInstance.on("connection", (socket) => {

    console.log(`🔌 New real-time handshake established: ${socket.id} (Role: ${socket.role})`);

    if (socket.userId) {
      socket.join(socket.userId.toString());
      console.log(`📡 Socket ${socket.id} automatically joined its user room ${socket.userId}`);
    }

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

    // Register driver handlers
    driverHandler(ioInstance, socket);
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