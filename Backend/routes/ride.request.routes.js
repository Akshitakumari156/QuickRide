const express = require("express");
const auth = require("../middlewares/auth.middleware");
const rideRequestController = require("../controllers/ride.request.controllers");
const router = express.Router();

router.use(auth);

router.post('/request', rideRequestController.createRide);
router.get("/active", rideRequestController.getActiveRide);
router.post('/cancel/:id', rideRequestController.cancelRide);
router.post('/cancel-by-request/:requestId', rideRequestController.cancelRideByRequest);

module.exports = router;