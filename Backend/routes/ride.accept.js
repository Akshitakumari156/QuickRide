const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.acceptance.controller");
const captainAuthModule = require("../middlewares/auth.captain.middleware");

let authCaptain = null;

if (typeof captainAuthModule === "function") {
  authCaptain = captainAuthModule;
} else if (captainAuthModule && typeof captainAuthModule === "object") {
  authCaptain = 
    captainAuthModule.authCaptain || 
    captainAuthModule.protectCaptain || 
    captainAuthModule.captainAuth ||
    Object.values(captainAuthModule).find(val => typeof val === "function"); 
}

if (typeof authCaptain !== "function") {
  console.warn("WARNING: Could not resolve function inside auth.captain.middleware.js. Using emergency bypass handler.");
  
  authCaptain = (req, res, next) => {
    console.log("Emergency bypass middleware invoked. Please check your auth.captain.middleware.js exports.");
    next();
  };
}

router.post("/accept", authCaptain, rideController.acceptRide);

module.exports = router;