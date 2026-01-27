const redis=require("../config/redis.config");
const nearbycaptainService=require("../services/captain.service");
const socket=require("../sockets/index");
exports.rideRequest=async(req,res)=>{
    const{pickup}=req.body;
    console.log("pickup location",pickup);
    try {
     const rideId=Date.now();
     const io=socket.io();
     const nearbycaptains=await nearbycaptainService.findNearbyCaptains(pickup.lat,pickup.lng);
     console.log("nearbycaptains",nearbycaptains);
        await redis.hmset(`ride:${rideId}`,{
        pickupLat:pickup.lat,
        pickupLng:pickup.lng,
        status:"requested"
     });
     for(const {captainId} of nearbycaptains){
        const socketId=await redis.hget(`captain:${captainId}:socket`,'socketId');
         console.log(" captainId:",captainId, "socketId:", socketId);
         if (socketId) {
        console.log("Emitting ride request to socket:", socketId);
        io.to(socketId).emit("ride:request", {
          rideId,
          pickup
        });
      }
     }
        res.status(200).json({ rideId, message: "Ride request sent to nearby captains." });
    

   

    }
   catch (error) {
  console.error(" error in ride request controller:", error);
  return res.status(500).json({
    message: "Ride request failed",
  });
}

}

