const express=require("express");
const auth=require("../middlewares/auth.middleware");
const rideRequestController=require("../controllers/ride.request.controllers");
const router=express.Router();
router.post('/request',auth,rideRequestController.createRide);

module.exports=router;
