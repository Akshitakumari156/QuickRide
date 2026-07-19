const Ride = require("../models/ride.model"); 
const redis = require("../config/redis.config");

exports.acceptRide = async (req, res) => {
  const { rideId } = req.body;
  
  const captainUser = req.captain || req.user;
  
  if (!captainUser) {
    return res.status(401).json({ 
      success: false, 
      message: "Unauthorized. Captain identity missing from request pipelines." 
    });
  }

  const captainId = captainUser._id;
  
  const captainName = captainUser.firstname 
    ? `${captainUser.firstname} ${captainUser.lastname || ""}`.trim() 
    : "Your Captain";
    
  const captainPhone = captainUser.phone || "N/A";

  if (!rideId) {
    return res.status(400).json({ success: false, message: "Ride identifier is missing." });
  }

  const lockKey = `lock:ride:${rideId}`;

  try {
    const acquireLock = await redis.set(lockKey, captainId.toString(), "NX", "EX", 15);

    if (!acquireLock) {
      console.warn(`Redis Lock Blocked: Captain ${captainId} denied access to Ride ${rideId}`);
      return res.status(409).json({
        success: false,
        message: "Too slow! Another captain has already accepted this ride request."
      });
    }

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
      return res.status(409).json({
        success: false,
        message: "This ride transaction is no longer active or pending."
      });
    }

    console.log(`Dual-Lock Verified. Ride ${rideId} committed cleanly to Captain: ${captainId}`);

    const io = req.app ? req.app.get("io") : null;

    if (io && typeof io.to === "function") {
      const payload = {
        message: "Your driver is heading your way!",
        ride: {
          _id: updatedRide._id,
          status: updatedRide.status,
          fare: updatedRide.fare,
          pickup: updatedRide.pickup,
          destination: updatedRide.destination,
          captain: { 
            name: captainName, 
            phone: captainPhone 
          }
        }
      };

      if (updatedRide.passengerId && updatedRide.passengerId.socketId) {
        io.to(updatedRide.passengerId.socketId).emit("ride:accepted", payload);
      }

      const passengerRoomId = updatedRide.passengerId?._id || updatedRide.passengerId;
      if (passengerRoomId) {
        io.to(passengerRoomId.toString()).emit("ride:accepted", payload);
      }

      io.emit("ride:confirmed", { rideId: updatedRide._id });
      console.log("SUCCESS: Real-time passenger alerts executed successfully via WebSockets!");
    } else {
      console.error("CRITICAL SOCKET ERROR: Could not resolve 'io' instance matrix.");
    }

    return res.status(200).json({
      success: true,
      message: "Ride secured successfully.",
      ride: {
        _id: updatedRide._id,
        status: updatedRide.status,
        fare: updatedRide.fare,
        pickup: updatedRide.pickup,
        destination: updatedRide.destination,
        captain: {
          name: captainName,
          phone: captainPhone
        }
      }
    });

  } catch (error) {
    console.error("Critical exception inside Ride Acceptance Pipeline:", error.message);
    try { await redis.del(lockKey); } catch (_) {}
    return res.status(500).json({ success: false, error: error.message });
  }
};