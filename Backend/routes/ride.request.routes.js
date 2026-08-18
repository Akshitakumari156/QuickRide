const express = require("express");
const auth = require("../middlewares/auth.middleware");
const rideRequestController = require("../controllers/ride.request.controllers");
const router = express.Router();

router.post('/request', auth, rideRequestController.createRide);
router.get("/active", auth, rideRequestController.getActiveRide);
router.get("/history", auth, rideRequestController.getRideHistory);
router.post('/cancel/:id', auth, rideRequestController.cancelRide);
router.post('/cancel-by-request/:requestId', auth, rideRequestController.cancelRideByRequest);

module.exports = router;