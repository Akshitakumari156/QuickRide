const express=require('express')
const router=express.Router();
const { registeruser, loginuser, getprofile, logoutuser, updateProfile, updatePassword, deleteAccount } = require('../controllers/user.controllers');
const auth = require('../middlewares/auth.middleware');

router.post('/register',registeruser)
router.post('/login',loginuser)
router.get('/profile',auth,getprofile)
router.post('/logout',auth,logoutuser)

router.put('/profile', auth, updateProfile);
router.put('/password', auth, updatePassword);
router.delete('/account', auth, deleteAccount);

module.exports=router;
