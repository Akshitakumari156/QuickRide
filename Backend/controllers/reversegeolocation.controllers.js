const redis=require('../config/redis.config');
const LOCATION_TTL=60;

exports.getAddressFromCoordinates=async(req,res)=>{
    const {lat,lng,captainId}=req.query;
    if(!lat || !lng || !captainId){
        return res.status(400).json({message:"missing parameters"});
    }
    const rediskey=`captain:${captainId}:location`;
    try {
        const cached=await redis.get(rediskey);
        if(cached){
            return res.json(JSON.parse(cached));
        }
        const response = await fetch(
  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`,
  {
    headers: {
      "User-Agent": "UrbanMove/1.0 (contact@urbanmove.app)",
      "Accept-Language": "en-IN,en;q=0.9",
    },
  }


  );
  const data = await response.json();
  const address = data.address || {};

const place =
  address.suburb ||
  address.neighbourhood ||
  address.residential ||
  address.quarter ||
  address.road ||
  address.town ||
  address.village ||
  address.city ||
  data.display_name?.split(",")[0] ||
  "Unknown area";
    const payload = {
    lat,
    lng,
    place,
    updatedAt: Date.now(),
  };
      await redis.set(
      rediskey,
      JSON.stringify(payload),
      "EX",
      60 // TTL in seconds
    
  );

  res.json(payload);

    } catch (error) {
        console.log("error in reverse geolocation controller",error);
        
    }
}