const redis=require('../../config/redis.config');

module.exports=(socket)=>{
    socket.on("captain:location",async (data)=>{
        const {captainId,lat,lng}=data;
        if (!captainId || !lat || !lng) return;
        await redis.geoadd(`captains:locations`,lng,lat,captainId);
        await redis.set(`captain:${captainId}`,"1","EX",30)
    });
  
}