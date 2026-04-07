const redis = require("../config/redis.config");
const nearbycaptainService = require("../services/captain.service");
const socket = require("../sockets/index");
const { v4: uuidv4 } = require("uuid");

exports.rideRequest = async (req, res) => {
  const { pickup } = req.body;

  if (!pickup || !pickup.lat || !pickup.lng) {
    return res.status(400).json({
      message: "Invalid pickup location",
    });
  }

  const userId = req.user?.id || "guest";
  const lockKey = `lock:user:${userId}`;

  try {
    const isLocked = await redis.set(lockKey, "locked", "NX", "PX", 5000);

    if (!isLocked) {
      return res.status(429).json({
        message: "Duplicate ride request detected. Please wait.",
      });
    }

    const rideId = uuidv4();
    const io = socket.io();

    const nearbycaptains = await nearbycaptainService.findNearbyCaptains(
      pickup.lat,
      pickup.lng
    );

    await redis.hset(`ride:${rideId}`, {
      pickupLat: pickup.lat,
      pickupLng: pickup.lng,
      status: "requested",
      userId,
    });

    for (const { captainId } of nearbycaptains) {
      const socketId = await redis.hget(
        `captain:${captainId}:socket`,
        "socketId"
      );

      if (socketId) {
        io.to(socketId).timeout(3000).emit(
          "ride:request",
          { rideId, pickup },
          (err, response) => {
            if (err) {
              console.log(`Captain ${captainId} did not respond`);
            } else {
              console.log(`Captain ${captainId} acknowledged`);
            }
          }
        );
      }
    }

    return res.status(200).json({
      rideId,
      message: "Ride request sent to nearby captains.",
    });
  } catch (error) {
    console.error("Ride request error:", error);

    return res.status(500).json({
      message: "Ride request failed",
    });
  }
};