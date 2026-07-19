const rideService = require('../services/ride.service');

exports.createRide = async (req, res, next) => {
    try {
        console.log("req.user =", req.user);
        const { pickup, destination, clientRequestId } = req.body;
        const passengerId = req.user._id;

        const { ride, nearbySocketIds } = await rideService.createRide({
            passengerId,
            pickup,
            destination,
            clientRequestId,
        });

        const io = req.app.get("io"); 
        
        const targetedCaptains = Array.isArray(nearbySocketIds) ? nearbySocketIds : [];

        if (io && targetedCaptains.length > 0) {
            targetedCaptains.forEach(socketId => {
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
            console.log(`Broadcasted ride request ${ride._id} to ${targetedCaptains.length} nearby captain sockets.`);
        } else {
            console.log(`Socket layer warning: No nearby driver sockets found or IO engine unbound.`);
        }

        return res.status(201).json({
            success: true,
            message: "Ride request created successfully. Scanning for nearby captains...",
            ride,
        });

    } catch (error) {
        if (error.message === "USER_HAS_ACTIVE_RIDE") {
            return res.status(409).json({
                success: false,
                message: "Cannot request ride: You already have an active or pending booking request."
            });
        }

        if (error.message === "REQUEST_CANCELLED") {
            return res.status(200).json({
                success: false,
                cancelled: true,
                message: "Ride request was cancelled before it could be created."
            });
        }

        next(error);
    }
};

exports.cancelRide = async (req, res, next) => {
    try {
        console.log("DEBUG: req.user inside cancelRide is ->", req.user);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed. req.user is undefined! Check your middleware routing order."
            });
        }

        const { id } = req.params;
        console.log(id);
        const passengerId = req.user._id;

        const result = await rideService.cancelRide({ rideId: id, passengerId });
        const ride = result?.ride || result;

        if (ride) {
            const io = req.app.get("io");
            if (io) {
                io.emit("ride:cancelled", { rideId: ride._id });
            }
        }

        return res.status(200).json({
            success: true,
            message: "Ride cancelled successfully.",
            ride: ride || null,
        });
    } catch (error) {
        if (error.message === "RIDE_NOT_FOUND") {
            return res.status(404).json({ success: false, message: "Ride not found or does not belong to this user." });
        }
        if (error.message === "RIDE_NOT_CANCELLABLE") {
            return res.status(409).json({ success: false, message: "This ride can no longer be cancelled." });
        }
        next(error);
    }
};

exports.cancelRideByRequest = async (req, res, next) => {
    try {
        const { requestId } = req.params;
        const passengerId = req.user._id;

        const result = await rideService.cancelRideByRequestId({
            clientRequestId: requestId,
            passengerId,
        });

        const ride = result?.ride || null;

        if (ride) {
            const io = req.app.get("io");
            if (io) {
                io.emit("ride:cancelled", { rideId: ride._id });
            }
        }

        return res.status(200).json({
            success: true,
            message: "Ride request cancelled successfully.",
            ride,
        });
    } catch (error) {
        if (error.message === "CLIENT_REQUEST_ID_REQUIRED") {
            return res.status(400).json({
                success: false,
                message: "requestId is required.",
            });
        }

        next(error);
    }
};

exports.getActiveRide = async (req, res, next) => {
    try {
        const passengerId = req.user._id;
        const ride = await rideService.getActiveRide(passengerId);

        return res.status(200).json({
            success: true,
            ride: ride || null 
        });

    } catch (err) {
        next(err);
    }
};