const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controllers'); // Adjusted to match your actual file name
const { captainMiddleware } = require('../middlewares/auth.captain.middleware');

router.post('/register', captainController.registerCaptain);
router.post('/login', captainController.logincaptain);

router.get('/profile', captainMiddleware, captainController.captainProfile);
router.post('/logout', captainMiddleware, captainController.logoutCaptain);

router.get('/get-nearby-captains', captainController.getNearbyCaptains);

module.exports = router;