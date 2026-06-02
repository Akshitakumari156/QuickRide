// socket/driverHandler.js
const redisClient = require('../config/redis.config');

module.exports = (io, socket) => {
  // Only handle tracking if the socket client is an authenticated driver
  if (socket.role !== "driver") return;

  const driverId = socket.userId;

  // Event A: Driver opens the app and toggles status to "Online"
  socket.on("driver:online", async (data) => {
    const { lat, lng } = data;

    if (!lat || !lng) {
      socket.emit("error", { message: "GPS coordinates required to go online." });
      return;
    }

    try {
      // 1. Map Driver ID to their active Socket ID string for direct targeted lookups
      await redisClient.set(`driver:socket:${driverId}`, socket.id, "EX", 86400);

      // 2. Add coordinates to Redis Spatial Engine Index
      // WARNING: ioredis geoadd format is (key, longitude, latitude, member)
      await redisClient.geoadd("drivers:online", Number(lng), Number(lat), String(driverId));

      // 3. Keep a fast status tracking hash map for driver profile lookups
      await redisClient.hset(`driver:profile:${driverId}`, 
        "status", "AVAILABLE",
        "lastUpdated", Date.now().toString()
      );

      // Join a private targeted room channel named after the driver's unique ID
      await socket.join(`driver:${driverId}`);

      console.log(`🚗 Driver ${driverId} is online. Live tracking bound to socket: ${socket.id}`);
      socket.emit("driver:status:updated", { status: "AVAILABLE" });

    } catch (error) {
      console.error("❌ Failed setting driver status to online in Redis:", error);
      socket.emit("error", { message: "Internal memory tracking error." });
    }
  });

  // Event B: Continuous 3-second live positional update packets
  socket.on("driver:location:update", async (data) => {
    const { lat, lng } = data;
    if (!lat || !lng) return;

    try {
      // Refresh geographic spatial metrics inside Redis
      await redisClient.geoadd("drivers:online", Number(lng), Number(lat), String(driverId));
      await redisClient.hset(`driver:profile:${driverId}`, "lastUpdated", Date.now().toString());
    } catch (error) {
      console.error(`❌ Telemetry streaming failed for driver: ${driverId}`, error);
    }
  });

  // Event C: Clean up instantly if the driver loses service or terminates the app
  socket.on("disconnect", async () => {
    try {
      await redisClient.del(`driver:socket:${driverId}`);
      await redisClient.zrem("drivers:online", String(driverId)); // Removes member from spatial index
      await redisClient.hset(`driver:profile:${driverId}`, "status", "OFFLINE");
      
      console.log(`🔌 Driver ${driverId} disconnected. Flushed from runtime tracking maps.`);
    } catch (error) {
      console.error("❌ Error running cleanup operations inside disconnect hook:", error);
    }
  });
};