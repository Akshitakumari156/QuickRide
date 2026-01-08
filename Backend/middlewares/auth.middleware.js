// check if the user is authorized or logged in 

const jwt=require('jsonwebtoken');
const userModel = require('../models/user.model');
const BlackListTokenModel = require('../models/Blacklisttoken.modle');

async function auth (req,res,next){
    const token=req.headers.authorization?.split(" ")[1]||req.cookies.token;
    if(!token){
        return res.json({
            message:"access denied , no token provided"
        })
    };
    const isblacklistedtoken=await BlackListTokenModel.findOne({token:token})
    if(isblacklistedtoken){
        return res.status(400).json({
            message:"invalid token"
        })
    }
    try{
                // decode the token 
                const decoded=jwt.verify(token,process.env.JWT_SECRET);
                const user=await userModel.findById(decoded._id);
                if(!user){
                    return res.status(401).json({   
                        message:"invalid token"
                    })}
                    req.user=user;
              return   next();
    }
    catch(err){
        return res.status(400).json({
            message:"invalid token"
        })
    }
}
module.exports=auth;