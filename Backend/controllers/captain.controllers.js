const BlackListTokenModel = require('../models/Blacklisttoken.modle');
const captainModel = require('../models/captain.model');
const userModel = require('../models/user.model');
const captainservice = require('../services/captain.service');
const jwt=require('jsonwebtoken')
exports.registerCaptain=async(req,res)=>{
    const{email,password,firstname,lastname,vehicle}=req.body;
    try {
        const iscaptainexist=await captainModel.findOne({email:email});
        if(iscaptainexist){
            return res.status(409).json({
                message:"captain already exists"
            })
        }
        const hashedPassword=await captainModel.hashPassword(password);
        const captain=await captainservice.createcaptain({
            firstname,
            lastname,
            email,
           password:hashedPassword,
            vehicle:{
                color:vehicle.color,
                plateNumber:vehicle.plateNumber,
                capacity:vehicle.capacity,
                vehicleType:vehicle.vehicleType

            }

        })
        const token=captain.generateAuthToken();
        res.status(201).json({
            message:"captain registered successfully",
            token,
            captain:{
                id:captain._id,
                firstname:captain.firstname,
                email:captain.email
            }
        })
        
    } catch (error) {
        console.log("error in registering captain",error)
    }
}

exports.logincaptain=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const captain= await captainModel.findOne({email}).select("+password");
        if(!captain){
            return res.status(404).json({
                message:"captain not found"
            })
                }
      else {
        
        const isMatch=await captain.comparePassword(password);
        if(!isMatch){
           return res.status(400).json({    
                message:"invalid password"
              })
        }
        else {
            const token=captain.generateAuthToken();
            res.status(200).json({
                message:"captain login successful",
                token,
                captain:{
                    id:captain._id,
                    firstname:captain.firstname,
                    email:captain.email
                }
            })
        }
        
      }


    } catch (error) {
        console.log("error in captain login",error)
    }
}
exports.captainProfile=async(req,res,next)=>{
   return res.status(200).json(req.captain);
}
exports.logoutCaptain=async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]||req.cookies?.token;
    res.clearCookie('token');
    await BlackListTokenModel.create({ token });
    return res.status(200).json({
        message:"captain logged out successfully"
    })
}