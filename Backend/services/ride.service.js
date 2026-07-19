const Ride = require("../models/ride.model");
const { getDistanceAndETA } = require("./map.service");
const { calculateFare } = require("./price.service");
const captainService = require("./captain.service"); 
const redis = require("../config/redis.config");      

const pendingAborts = new Set();

exports.createRide = async ({
  passengerId,
  pickup,
  destination,
  clientRequestId,
}) => {
  const existingActiveRide = await Ride.findOne({
    passengerId,
    status: { $in: ["PENDING", "ACCEPTED", "ONGOING"] }
  });

  if (existingActiveRide) {
    throw new Error("USER_HAS_ACTIVE_RIDE");
  }

  if (clientRequestId && pendingAborts.has(clientRequestId)) {
    pendingAborts.delete(clientRequestId);
    throw new Error("REQUEST_CANCELLED");
  }

  const { distanceKm, durationMin } = await getDistanceAndETA(
    { lat: pickup.lat, lng: pickup.lng },
    { lat: destination.lat, lng: destination.lng }
  );

  if (clientRequestId && pendingAborts.has(clientRequestId)) {
    pendingAborts.delete(clientRequestId);
    throw new Error("REQUEST_CANCELLED");
  }

  const fare = calculateFare(Number(distanceKm), Number(durationMin));

  const ride = await Ride.create({
    passengerId,
    pickup,
    destination,
    distanceKm,
    durationMin,
    fare,
    status: "PENDING",
    clientRequestId
  });

  const nearbyCaptains = await captainService.findNearbyCaptains(pickup.lat, pickup.lng);
  console.log("Nearby Captains matched in spatial index:", nearbyCaptains);

  const nearbySocketIds = [];

  for (const captain of nearbyCaptains) {
    let socketId = null;
    let targetCaptainId = captain && typeof captain === 'object' && captain.captainId ? captain.captainId : captain;

    if (!targetCaptainId) continue;

    const lookupKey = `driver:socket:${targetCaptainId}`;

    try {
      socketId = await redis.get(lookupKey);
    } catch (redisError) {
      console.error(`Redis core extraction failed for key [${lookupKey}]:`, redisError.message);
    }

    if (socketId) {
      nearbySocketIds.push(socketId);
    }
  }

  return { ride, nearbySocketIds };
};

exports.cancelRide = async ({ rideId, passengerId }) => {
    if (!rideId) throw new Error("RIDE_ID_REQUIRED");

    const rideCheck = await Ride.findOne({ _id: rideId, passengerId });
    if (!rideCheck) throw new Error("RIDE_NOT_FOUND");

    if (rideCheck.status === 'COMPLETED' || rideCheck.status === 'ONGOING') {
        throw new Error("RIDE_NOT_CANCELLABLE");
    }

    const ride = await Ride.findByIdAndUpdate(
        rideId,
        { $set: { status: 'CANCELLED' } },
        { new: true, runValidators: false }
    );

    return ride;
};

exports.cancelRideByRequestId = async ({ clientRequestId, passengerId }) => {
    if (!clientRequestId) throw new Error("CLIENT_REQUEST_ID_REQUIRED");

    const ride = await Ride.findOne({ clientRequestId, passengerId });
    
    if (ride) {
        if (ride.status === 'PENDING' || ride.status === 'ACCEPTED') {
            ride.status = 'CANCELLED';
            await ride.save();
        }
        return { ride };
    }

    pendingAborts.add(clientRequestId);
    
    setTimeout(() => pendingAborts.delete(clientRequestId), 60000);

    return { ride: null, marked: true };
};

exports.getActiveRide = async (passengerId) => {
    const ride = await Ride.findOne({
        passengerId,
        status: { $in: ["PENDING", "ACCEPTED", "ONGOING"] }
    }).sort({ createdAt: -1 });

    return ride;
};