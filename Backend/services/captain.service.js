const captainModel = require('../models/captain.model');
const redis=require('../config/redis.config');
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
        vehicle:{
            color:vehicle.color,
            plateNumber:vehicle.plateNumber,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType
        }
    })
    return captain ;

}



exports.findNearbyCaptains = async (lat, lng) => {
  const results = await redis.geosearch(
    "captains:geo",
    "FROMLONLAT",
    lng,
    lat,
    "BYRADIUS",
    5,
    "km",
    "WITHDIST"
  );

  return results.map(([captainId, distance]) => ({
    captainId,
    distanceKm: Number(distance),
  }));
};
