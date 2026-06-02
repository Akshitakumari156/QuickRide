const Ride = require("../models/ride.model");
const { getDistanceAndETA } = require("./map.service");
const { calculateFare } = require("./price.service");
const captainService = require("./captain.service"); // Needed to discover nearby drivers
const redis = require("../config/redis.config");      // Your verified raw ioredis instance

exports.createRide = async ({
  passengerId,
  pickup,
  destination,
}) => {
  // 1. Guardrail Check: Ensure this user doesn't already have an active request or trip
  const existingActiveRide = await Ride.findOne({
    passengerId,
    status: { $in: ["PENDING", "ACCEPTED", "ONGOING"] }
  });

  if (existingActiveRide) {
    throw new Error("USER_HAS_ACTIVE_RIDE");
  }

  // 2. Calculate real-world metrics via Map Routing Engine
  const { distanceKm, durationMin } = await getDistanceAndETA(
    {
      lat: pickup.lat,
      lng: pickup.lng,
    },
    {
      lat: destination.lat,
      lng: destination.lng,
    }
  );

  // 3. Compute structural tier pricing Matrix
  const fare = calculateFare(
    Number(distanceKm),
    Number(durationMin)
  );

  // 4. Save the finalized ride entry to MongoDB
  const ride = await Ride.create({
    passengerId,
    pickup,
    destination,
    distanceKm,
    durationMin,
    fare,
    status: "PENDING",
  });

  // 5. Query Redis Geospatial Index layer to locate captains within 5km of pickup spot
  const nearbyCaptains = await captainService.findNearbyCaptains(pickup.lat, pickup.lng);
  console.log("🔍 Nearby Captains matched in spatial index:", nearbyCaptains);

  const nearbySocketIds = [];

  // 6. Loop through nearby captains and pull their active WebSocket socket IDs directly from ioredis
  for (const captain of nearbyCaptains) {
    let socketId = null;
    
    // Normalize target captain ID check if it's an object property or a raw string value
    let targetCaptainId = null;
    if (captain && typeof captain === 'object' && captain.captainId) {
      targetCaptainId = captain.captainId;
    } else {
      targetCaptainId = captain;
    }

    if (!targetCaptainId) continue;

    const lookupKey = `driver:socket:${targetCaptainId}`;

    try {
      // Direct call to your pure ioredis client instance object
      socketId = await redis.get(lookupKey);
    } catch (redisError) {
      console.error(`❌ Redis core extraction failed for key [${lookupKey}]:`, redisError.message);
    }

    if (socketId) {
      console.log(`🎯 Map Resolved! Socket Match Found: ${socketId}`);
      nearbySocketIds.push(socketId);
    } else {
      console.warn(`⚠️ Key match lookup returned empty for: ${lookupKey}. (Driver might not be saved properly inside Redis memory layout).`);
    }
  }

  console.log("📡 Target socket pipeline distribution list:", nearbySocketIds);

  // Return both the database record and the targeted transmission pipeline list
  return {
    ride,
    nearbySocketIds
  };
};