const express=require('express')
const router=express.Router();
const { getDistanceBetweenSrcAndDst } = require('../controllers/location.controllers');
router.get('/distance',getDistanceBetweenSrcAndDst)
module.exports=router;