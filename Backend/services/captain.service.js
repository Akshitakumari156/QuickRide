const captainModel = require('../models/captain.model');
module.exports.createcaptain=async({
    firstname,
    lastname,
    email,
    password,
   vehicle

})=>{
    if(!firstname || !email || !password || !vehicle.color || !vehicle.plateNumber || !vehicle.capacity || !vehicle.vehicleType){
        throw new Error("all fields are required")
    }
   const captain=captainModel.create({
        firstname,
        lastname,
        email,
        password,
        vechile:{
            color:vehicle.color,
            plateNumber:vehicle.plateNumber,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicle
        }
    })
    return captain ;

}