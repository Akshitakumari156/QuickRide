const redis = require('../../config/redis.config');
const jwt = require('jsonwebtoken');
const Ride = require('../../models/ride.model');

module.exports = (socket) => {
 socket.on("captain:location", async (data) => {
  try {
    const payload = typeof data === "string" ? JSON.parse(data) : data;

    const decode = jwt.verify(payload.token, process.env.JWT_SECRET);
    const captainId = decode._id;
    const { lat, lng } = payload;

    if (!captainId || isNaN(lat) || isNaN(lng)) return;

    socket.captainId = captainId;

    const pipeline = redis.pipeline();

    pipeline.geoadd(
      "captains:location",
      parseFloat(lng),
      parseFloat(lat),
      captainId.toString()
    );

    pipeline.set(`captain:${captainId}:online`, "1", "EX", 120);

    pipeline.hset(
      `captain:${captainId}:socket`,
      "socketId",
      socket.id
    );
    pipeline.expire(`captain:${captainId}:socket`, 120);

    // 🔑 CRITICAL FIX: Store driver socket ID in Redis for future broadcast targeting
    pipeline.set(
      `driver:socket:${captainId}`,
      socket.id,
      "EX",
      300 // 5-minute TTL
    );

    await pipeline.exec();

    console.log(`✅ Captain ${captainId} registered online with socket ${socket.id}`);

  } catch (err) {
    console.error("captain:location error", err);
  }
});

// ⚡ NEW: Proper ride acceptance handler that integrates with REST API
socket.on("ride:accept", async ({ rideId }) => {
  try {
    const captainId = socket.captainId;
    if (!rideId || !captainId) {
      socket.emit("ride:error", { message: "Missing rideId or captain identification" });
      return;
    }

    // 🔒 DISTRIBUTED LOCK: Prevent race conditions
    const lockKey = `lock:ride:${rideId}`;
    const acquireLock = await redis.set(lockKey, captainId.toString(), "NX", "EX", 15);

    if (!acquireLock) {
      console.warn(`🔒 Redis Lock Blocked: Captain ${captainId} denied access to Ride ${rideId}`);
      return socket.emit("ride:rejected", {
        rideId,
        reason: "Ride already accepted by another captain"
      });
    }

    // 💾 UPDATE MONGODB: Mark ride as ACCEPTED
    const updatedRide = await Ride.findOneAndUpdate(
      { 
        _id: rideId, 
        status: "PENDING" 
      },
      {
        $set: {
          status: "ACCEPTED", 
          captainId: captainId, 
        }
      },
      { new: true }
    ).populate("passengerId", "firstname lastname phone socketId");

    if (!updatedRide) {
      await redis.del(lockKey);
      return socket.emit("ride:rejected", {
        rideId,
        reason: "Ride already taken or no longer available"
      });
    }

    const captainName = `${updatedRide.captainId?.firstname || ''} ${updatedRide.captainId?.lastname || ''}`.trim() || "Your Captain";
    const captainPhone = updatedRide.captainId?.phone || "N/A";

    // ✅ CONFIRMATION TO CAPTAIN: This ride is now theirs
    socket.emit("ride:confirmed", {
      rideId: updatedRide._id,
      message: "Ride successfully assigned to you!",
      ride: {
        _id: updatedRide._id,
        status: updatedRide.status,
        fare: updatedRide.fare,
        pickup: updatedRide.pickup,
        destination: updatedRide.destination,
      }
    });

    // 📢 BROADCAST TO PASSENGER: Driver accepted!
    const passengerSocketId = updatedRide.passengerId?.socketId;
    const io = socket.nsp.server;

    if (io) {
      // Emit to passenger's direct socket connection
      if (passengerSocketId) {
        io.to(passengerSocketId).emit("ride:accepted", {
          message: "Your driver is on the way!",
          ride: {
            _id: updatedRide._id,
            status: updatedRide.status,
            fare: updatedRide.fare,
            pickup: updatedRide.pickup,
            destination: updatedRide.destination,
            captain: {
              name: captainName,
              phone: captainPhone,
              id: captainId
            }
          }
        });
      }

      // Fallback: Emit to passenger's user ID room
      const passengerRoomId = updatedRide.passengerId?._id?.toString();
      if (passengerRoomId) {
        io.to(passengerRoomId).emit("ride:accepted", {
          message: "Your driver is on the way!",
          ride: {
            _id: updatedRide._id,
            status: updatedRide.status,
            fare: updatedRide.fare,
            pickup: updatedRide.pickup,
            destination: updatedRide.destination,
            captain: {
              name: captainName,
              phone: captainPhone,
              id: captainId
            }
          }
        });
      }

      // 🔔 BROADCAST TO OTHER CAPTAINS: This ride is taken
      io.emit("ride:confirmed", { rideId: updatedRide._id });
    }

    console.log(`✅ Ride ${rideId} accepted by captain ${captainId}`);

  } catch (err) {
    console.error("ride:accept error", err);
    socket.emit("ride:error", {
      message: "Ride accept failed: " + err.message
    });
  }
});

  socket.on("disconnect", async () => {
    try {
      if (!socket.captainId) return;

      const pipeline = redis.pipeline();
      pipeline.zrem("captains:location", socket.captainId);
      pipeline.del(`captain:${socket.captainId}:online`);
      pipeline.del(`driver:socket:${socket.captainId}`);
      
      await pipeline.exec();
      console.log(`👋 Driver ${socket.captainId} disconnected and cleaned up.`);
    } catch (error) {
      console.error("🔥 Redis Error during disconnect:", error);
    }
  });
};