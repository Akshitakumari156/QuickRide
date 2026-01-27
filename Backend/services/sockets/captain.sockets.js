const redis = require('../../config/redis.config');
const jwt = require('jsonwebtoken');
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

    await pipeline.exec();

  } catch (err) {
    console.error("captain:location error", err);
  }
});

socket.on("ride:accept", async ({ rideId }) => {
  try {
    const captainId = socket.captainId;
    if (!rideId || !captainId) return;

    const status = await redis.hget(`ride:${rideId}`, "status");

    if (status !== "requested") {
      return socket.emit("ride:rejected", {
        rideId,
        reason: "Ride already taken"
      });
    }

    const lockKey = `ride:${rideId}:lock`;
    const lock = await redis.set(lockKey, captainId, "NX", "EX", 30);

    if (!lock) {
      return socket.emit("ride:rejected", {
        rideId,
        reason: "Ride already accepted by another captain"
      });
    }

    await redis.hset(`ride:${rideId}`, {
      status: "accepted",
      captainId
    });

    socket.emit("ride:confirmed", {
      rideId,
      message: "Ride successfully assigned to you"
    });

    console.log(`✅ Ride ${rideId} accepted by captain ${captainId}`);

  } catch (err) {
    console.error("ride:accept error", err);
    socket.emit("ride:error", {
      message: "Ride accept failed"
    });
  }
});


  socket.on("disconnect", async () => {
    try {
      if (!socket.captainId) return;

      const pipeline = redis.pipeline();
      pipeline.zrem("captains:location", socket.captainId);
      pipeline.del(`captain:${socket.captainId}:online`);
     // pipeline.del(`captain:${socket.captainId}:socket`);
      
      await pipeline.exec();
      console.log(`👋 Driver ${socket.captainId} disconnected and cleaned up.`);
    } catch (error) {
      console.error("🔥 Redis Error during disconnect:", error);
    }
  });
};