const captainModel = require('../models/captain.model');
const captainservice = require('../services/captain.service');
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