const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controllers'); // Adjusted to match your actual file name
const { captainMiddleware } = require('../middlewares/auth.captain.middleware');

router.post('/register', captainController.registerCaptain);
router.post('/login', captainController.logincaptain);

// 👤 Profile Actions (Protected)
router.get('/profile', captainMiddleware, captainController.captainProfile);
router.post('/logout', captainMiddleware, captainController.logoutCaptain);

// 📡 Geospatial Matching Engine (Can be public or protected depending on preference)
router.get('/get-nearby-captains', captainController.getNearbyCaptains);

module.exports = router;