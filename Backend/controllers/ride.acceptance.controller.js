const Ride = require("../models/ride.model"); 
const User = require("../models/user.model");
const Captain = require("../models/captain.model");
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
    ).select('+otp').populate("passengerId", "firstname lastname phone socketId"); 

    if (!updatedRide) {
      await redis.del(lockKey);
      return res.status(409).json({
        success: false,
        message: "This ride transaction is no longer active or pending."
      });
    }

    console.log(`Dual-Lock Verified. Ride ${rideId} committed cleanly to Captain: ${captainId}`);

    // Add to History
    if (updatedRide.passengerId) {
      await User.findByIdAndUpdate(updatedRide.passengerId._id || updatedRide.passengerId, {
        $addToSet: { history: updatedRide._id }
      });
    }
    await Captain.findByIdAndUpdate(captainId, {
      $addToSet: { history: updatedRide._id }
    });

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
          otp: updatedRide.otp, // Sent to passenger
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
        const roomName = passengerRoomId.toString();
        const roomSockets = io.sockets.adapter.rooms.get(roomName);
        console.log(`EMITTING ride:accepted to room: ${roomName}. Sockets in room:`, roomSockets ? Array.from(roomSockets) : "NONE");
        io.to(roomName).emit("ride:accepted", payload);
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

exports.arrivedAtPickup = async (req, res) => {
  const { rideId } = req.body;
  const captainUser = req.captain || req.user;
  
  if (!captainUser) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  try {
    const ride = await Ride.findOneAndUpdate(
      { _id: rideId, captainId: captainUser._id, status: "ACCEPTED" },
      { $set: { status: "ARRIVED" } },
      { new: true }
    ).populate("passengerId", "socketId _id");

    if (!ride) {
      return res.status(400).json({ success: false, message: "Ride not found or invalid status." });
    }

    const io = req.app.get("io");
    if (io) {
      const passengerRoomId = ride.passengerId?._id || ride.passengerId;
      if (passengerRoomId) {
        io.to(passengerRoomId.toString()).emit("ride:arrived", {
          message: "Your captain has arrived at the pickup location.",
          ride: { _id: ride._id, status: ride.status }
        });
      }
    }

    return res.status(200).json({ success: true, message: "Arrived at pickup", ride });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.startRide = async (req, res) => {
  const { rideId, otp } = req.body;
  const captainUser = req.captain || req.user;

  if (!captainUser) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  try {
    // Explicitly select OTP for verification
    const ride = await Ride.findOne({ _id: rideId, captainId: captainUser._id }).select('+otp').populate("passengerId", "socketId _id");

    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found." });
    }
    
    if (ride.status !== "ACCEPTED" && ride.status !== "ARRIVED") {
      return res.status(400).json({ success: false, message: "Ride cannot be started from this status." });
    }

    if (ride.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    ride.status = "ONGOING";
    await ride.save();

    const io = req.app.get("io");
    if (io) {
      const passengerRoomId = ride.passengerId?._id || ride.passengerId;
      if (passengerRoomId) {
        io.to(passengerRoomId.toString()).emit("ride:started", {
          message: "Your ride has started. Have a safe journey!",
          ride: { _id: ride._id, status: ride.status }
        });
      }
    }

    return res.status(200).json({ success: true, message: "Ride started successfully", ride });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.endRide = async (req, res) => {
  const { rideId } = req.body;
  const captainUser = req.captain || req.user;

  if (!captainUser) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  try {
    const ride = await Ride.findOne({ _id: rideId, captainId: captainUser._id }).populate("passengerId", "socketId _id");

    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found." });
    }
    
    if (ride.status !== "ONGOING") {
      return res.status(400).json({ success: false, message: "Ride is not ongoing." });
    }

    ride.status = "COMPLETED";
    await ride.save();

    const io = req.app.get("io");
    if (io) {
      const passengerRoomId = ride.passengerId?._id || ride.passengerId;
      if (passengerRoomId) {
        io.to(passengerRoomId.toString()).emit("ride:completed", {
          message: "Your ride has been completed. Thank you for riding with us!",
          ride: { _id: ride._id, status: ride.status }
        });
      }
    }

    return res.status(200).json({ success: true, message: "Ride completed successfully", ride });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getCaptainActiveRide = async (req, res, next) => {
    try {
        const captainId = req.captain._id || req.user._id;
        const rideService = require('../services/ride.service');
        const ride = await rideService.getCaptainActiveRide(captainId);

        return res.status(200).json({
            success: true,
            ride: ride || null 
        });

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

exports.getCaptainRideHistory = async (req, res, next) => {
    try {
        const captainId = req.captain._id || req.user._id;
        const Ride = require("../models/ride.model");
        const history = await Ride.find({ captainId: captainId })
            .populate('passengerId', 'firstname lastname phone')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            history: history || []
        });

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};