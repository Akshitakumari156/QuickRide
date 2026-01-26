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