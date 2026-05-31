const rideService = require('../services/ride.service');

exports.createRide = async (
    req,
    res,
    next
) => {
    try {
      console.log("req.user =", req.user);
        const { pickup, destination } = req.body;

        const passengerId=req.user._id;

        const ride =
            await rideService.createRide({
                passengerId,
                pickup,
                destination,
            });

        return res.status(201).json({
            success: true,
            ride,
        });

    } catch (error) {
        next(error);
    }
};