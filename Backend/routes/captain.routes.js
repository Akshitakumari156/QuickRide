const express=require('express')
const router=express.Router();
const registerCaptain = require('../controllers/captain.controllers');
const { captainMiddleware } = require('../middlewares/auth.captain.middleware');
const { nearbycaptain } = require('../controllers/nearbycaptain.controller');
router.post('/register',registerCaptain.registerCaptain)
router.post('/login',registerCaptain.logincaptain)
router.get('/profile',captainMiddleware,registerCaptain.captainProfile)
router.post('/logout',captainMiddleware,registerCaptain.logoutCaptain)
router.get('/nearby',nearbycaptain)
module.exports=router;