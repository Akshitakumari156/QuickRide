const redis = require("../config/redis.config");
const nearbycaptainService = require("../services/captain.service");
const socket = require("../sockets/index");

exports.rideRequest = async (req, res) => {
  const { pickup } = req.body;
  const userId = req.user?.id || "guest";
  const lockKey = `lock:ride:${userId}`;

  try {
    const isLocked = await redis.set(lockKey, "locked", "NX", "PX", 5000);

    if (!isLocked) {
      return res.status(429).json({
        message: "Duplicate ride request detected. Please wait.",
      });
    }

    const rideId = Date.now();
    const io = socket.io();

    const nearbycaptains = await nearbycaptainService.findNearbyCaptains(
      pickup.lat,
      pickup.lng
    );

    await redis.hmset(`ride:${rideId}`, {
      pickupLat: pickup.lat,
      pickupLng: pickup.lng,
      status: "requested",
    });

    for (const { captainId } of nearbycaptains) {
      const socketId = await redis.hget(
        `captain:${captainId}:socket`,
        "socketId"
      );

      if (socketId) {
        io.to(socketId).emit("ride:request", {
          rideId,
          pickup,
        });
      }
    }

    res.status(200).json({
      rideId,
      message: "Ride request sent to nearby captains.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ride request failed",
    });
  } finally {
    await redis.del(lockKey);
  }
};