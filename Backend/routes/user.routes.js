const express=require('express')
const router=express.Router();
const { registeruser, loginuser, getprofile, logoutuser } = require('../controllers/user.controllers');
const auth = require('../middlewares/auth.middleware');
router.post('/register',registeruser)
router.post('/login',loginuser)
router.get('/profile',auth,getprofile)
router.post('/logout',auth,logoutuser)
module.exports=router;
