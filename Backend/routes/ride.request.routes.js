const express=require("express");
const rideRequestController=require("../controllers/ride.request.controllers");
const router=express.Router();
router.post('/request',rideRequestController.rideRequest);

module.exports=router;
