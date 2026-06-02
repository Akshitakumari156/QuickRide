// services/captain.service.js
const captainModel = require('../models/captain.model');
const redisConfig = require('../config/redis.config'); // Named redisConfig to prevent scope confusion

/**
 * Creates a brand new Captain profile database record
 */
module.exports.createcaptain = async ({
    firstname,
    lastname,
    email,
    password,
    vehicle
}) => {
    if (!firstname || !email || !password || !vehicle.color || !vehicle.plateNumber || !vehicle.capacity || !vehicle.vehicleType) {
        throw new Error("all fields are required");
    }
    
    const captain = await captainModel.create({
        firstname,
        lastname,
        email,
        password,
        vehicle: {
            color: vehicle.color,
            plateNumber: vehicle.plateNumber,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    });
    
    return captain;
};

/**
 * Spatial Engine Matching: Finds online captains cached inside your Redis server layer
 */
module.exports.findNearbyCaptains = async (lat, lng) => {
  console.log(`🔍 Finding nearby captains for target grid -> Lat: ${lat}, Lng: ${lng}`);
  
  // 1. Explicitly cast incoming data strings to numeric floats
  const longitude = parseFloat(lng);
  const latitude = parseFloat(lat);

  if (isNaN(longitude) || isNaN(latitude)) {
    throw new Error("Invalid coordinate input matrix: lat and lng must be valid numbers.");
  }

  try {
    // 2. ⚡ THE CRITICAL RESOLVER: Extract raw connection client regardless of export layout
    let clientInstance;
    
    if (typeof redisConfig.georadius === 'function') {
        clientInstance = redisConfig; // Direct export
    } else if (redisConfig.redis && typeof redisConfig.redis.georadius === 'function') {
        clientInstance = redisConfig.redis; // Nested export pattern A
    } else if (redisConfig.client && typeof redisConfig.client.georadius === 'function') {
        clientInstance = redisConfig.client; // Nested export pattern B
    } else {
        // Fallback to the object context if no explicit functions are matched
        clientInstance = redisConfig;
    }

    // Double-check if the connection instance exists before calling commands
    if (!clientInstance || typeof clientInstance.georadius !== 'function') {
        console.error("❌ Diagnostic: Detected your redis.config export is structurally unresolvable.", redisConfig);
        throw new Error("Redis client initialization failed: georadius command is not a function.");
    }

    // 3. Fire the universally compatible tracking lookup command
    const results = await clientInstance.georadius(
      "drivers:online",
      longitude,
      latitude,
      5, // 5km radius threshold boundary
      "km",
      "WITHDIST"
    );

    if (!results || results.length === 0) {
      return [];
    }

    // 4. Map structured parameters safely
    return results.map(([captainId, distance]) => ({
      captainId: String(captainId),
      distanceKm: parseFloat(distance),
    }));

  } catch (error) {
    console.error("❌ Redis Spatial Matching Error in Service Layer:", error.message);
    throw error;
  }
};