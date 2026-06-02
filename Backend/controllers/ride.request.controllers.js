const rideService = require('../services/ride.service');

exports.createRide = async (
    req,
    res,
    next
) => {
    try {
        console.log("req.user =", req.user);
        const { pickup, destination } = req.body;

        const passengerId = req.user._id;

        // 1. Destructure BOTH parameters returned by your updated service layer
        const { ride, nearbySocketIds } = 
            await rideService.createRide({
                passengerId,
                pickup,
                destination,
            });

        // 2. 📢 REAL-TIME SOCKET FAN-OUT BROADCAST
        // This grabs your central Socket.io instance bound to your main Express app instance
        const io = req.app.get("io"); 

        if (io && nearbySocketIds.length > 0) {
            nearbySocketIds.forEach(socketId => {
                // Emit targeted alert directly to each individual nearby captain's pipeline
                io.to(socketId).emit("ride:request", {
                    _id: ride._id,
                    rideId: ride._id,
                    fare: ride.fare,
                    distanceKm: ride.distanceKm,
                    durationMin: ride.durationMin,
                    pickup: ride.pickup,
                    destination: ride.destination,
                    status: "PENDING"
                });
            });
            console.log(`📡 Broadcasted ride request ${ride._id} to ${nearbySocketIds.length} nearby captain sockets.`);
        } else {
            console.log(`⚠️ Socket layer warning: No nearby driver sockets found or IO engine unbound.`);
        }

        // 3. Respond back to your passenger to trigger the "Searching..." screen animation
        return res.status(201).json({
            success: true,
            message: "Ride request created successfully. Scanning for nearby captains...",
            ride,
        });

    } catch (error) {
        // Handle your custom guardrail error gracefully before passing to next global middleware
        if (error.message === "USER_HAS_ACTIVE_RIDE") {
            return res.status(409).json({
                success: false,
                message: "Cannot request ride: You already have an active or pending booking request."
            });
        }
        
        next(error);
    }
};