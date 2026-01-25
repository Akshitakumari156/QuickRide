const redis = require('../../config/redis.config');
console.log("✅ Captain socket file loaded");

module.exports = (socket) => {
  socket.on("captain:location", async (data) => {
    try {
      const { captainId, lat, lng } = data;

      
      if (!captainId || isNaN(lat) || isNaN(lng)) {
        console.error(" Invalid location data received:", data);
        return;
      }

  
      socket.captainId = captainId;
      await redis.geoadd(
        "captains:location",
        parseFloat(lng),
        parseFloat(lat),
        captainId.toString()
      );

      await redis.set(`captain:${captainId}`, "online", "EX", 30);

    } catch (error) {
      console.error("🔥 Redis Error in captain:location:", error);
    }
  });

  socket.on("disconnect", async () => {
    try {
      if (!socket.captainId) return;
      const pipeline = redis.pipeline();
      pipeline.zrem("captains:location", socket.captainId);
      pipeline.del(`captain:${socket.captainId}`);
      await pipeline.exec();
      console.log(`Driver ${socket.captainId} disconnected and cleaned up.`);
    } catch (error) {
      console.error("🔥 Redis Error during disconnect:", error);
    }
  });
};