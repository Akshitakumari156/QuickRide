const redis = require("../config/redis.config");
const Ride = require("../models/ride.model");
const socket = require("../sockets/index");

exports.acceptRide = async (req, res) => {
  const { rideId } = req.body;
  const captainId = req.user?.id;

  if (!rideId) {
    return res.status(400).json({
      message: "RideId is required",
    });
  }

  const lockKey = `lock:ride:${rideId}`;

  try {
    const isLocked = await redis.set(lockKey, captainId, "NX", "EX", 5);

    if (!isLocked) {
      return res.status(409).json({
        message: "Ride already accepted by another captain",
      });
    }

    let ride = await Ride.findOne({ rideId });

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    if (ride.status === "accepted") {
      return res.status(409).json({
        message: "Ride already assigned",
      });
    }

    ride.status = "accepted";
    ride.captainId = captainId;

    await ride.save();

    await redis.hset(`ride:${rideId}`, {
      status: "accepted",
      captainId,
    });

    const io = socket.io();

    const userSocketId = await redis.hget(
      `user:${ride.userId}:socket`,
      "socketId"
    );

    if (userSocketId) {
      io.to(userSocketId).emit("ride:accepted", {
        rideId,
        captainId,
      });
    }

    return res.status(200).json({
      message: "Ride accepted successfully",
      rideId,
    });
  } catch (error) {
    console.error("Accept ride error:", error);

    return res.status(500).json({
      message: "Ride acceptance failed",
    });
  }
};