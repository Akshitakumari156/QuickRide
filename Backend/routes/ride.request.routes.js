const express=require("express");
const rideRequestController=require("../controllers/ride.request.controllers");
const router=express.Router();
router.get('/request',rideRequestController.rideRequest);

module.exports=router;
