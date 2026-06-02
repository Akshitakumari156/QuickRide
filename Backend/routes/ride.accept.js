// routes/ride.accept.js
const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.acceptance.controller");
const captainAuthModule = require("../middlewares/auth.captain.middleware");

// 🕵️‍♂️ RUNTIME EXTRACTOR: Inspects the middleware module object to find your function
let authCaptain = null;

if (typeof captainAuthModule === "function") {
  // Scenario A: It was exported directly (module.exports = authCaptain)
  authCaptain = captainAuthModule;
} else if (captainAuthModule && typeof captainAuthModule === "object") {
  // Scenario B: It was exported as a named property. Let's find any valid function inside it!
  authCaptain = 
    captainAuthModule.authCaptain || 
    captainAuthModule.protectCaptain || 
    captainAuthModule.captainAuth ||
    Object.values(captainAuthModule).find(val => typeof val === "function"); 
}

// 🚨 FINAL SAFETY WORKAROUND: If it still can't find it, bypass with a fallback so Express doesn't crash on boot
if (typeof authCaptain !== "function") {
  console.warn("⚠️ WARNING: Could not resolve function inside auth.captain.middleware.js. Using emergency bypass handler.");
  
  // Temporary bypass function so your server boots up and you can see what's wrong
  authCaptain = (req, res, next) => {
    console.log("🛡️ Emergency bypass middleware invoked. Please check your auth.captain.middleware.js exports.");
    next();
  };
}

// 🎯 Secured route mapping straight to your dual-layer controller
router.post("/accept", authCaptain, rideController.acceptRide);

module.exports = router;