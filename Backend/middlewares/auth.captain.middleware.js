 const jwt=require('jsonwebtoken')
 const captainModel = require('../models/captain.model');
const BlackListTokenModel = require('../models/Blacklisttoken.modle');
 exports.captainMiddleware=async(req,res,next)=>{
 const token=req.headers.authorization?.split(" ")[1]||req.cookies?.token;
 if(!token){
        return res.status(401).json({
            message:"unauthoprized captain "
        })
 }
 const isBlacklist=await BlackListTokenModel.findOne({token});
 if(isBlacklist){
        return res.status(400).json({
            message:"invalid token"
        })
 }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captainModel.findById(decoded._id);
        if(!captain){
            return res.status(404).json({
                message:"captain not found"
            })
        }
     req.captain=captain;
     next();

    }
    catch(error){
        console.log("error in fetching captain profile",error)
    }
}