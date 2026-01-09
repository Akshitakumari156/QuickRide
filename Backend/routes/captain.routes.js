const express=require('express')
const router=express.Router();
const registerCaptain = require('../controllers/captain.controllers');
router.post('/register',registerCaptain.registerCaptain)
module.exports=router;