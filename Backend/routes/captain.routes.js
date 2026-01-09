const express=require('express')
const router=express.Router();
const registerCaptain = require('../controllers/captain.controllers');
const { captainMiddleware } = require('../middlewares/auth.captain.middleware');
router.post('/register',registerCaptain.registerCaptain)
router.post('/login',registerCaptain.logincaptain)
router.get('/profile',captainMiddleware,registerCaptain.captainProfile)
router.post('/logout',captainMiddleware,registerCaptain.logoutCaptain)
module.exports=router;