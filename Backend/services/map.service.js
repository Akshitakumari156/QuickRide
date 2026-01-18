 exports.getDistanceAndETA=async(src,dst)=>{
    const{lat:srcLat,lon:srcLon}=src;
    const{lat:dstLat,lon:dstLon}=dst;
    const url= `https://router.project-osrm.org/route/v1/driving/${srcLon},${srcLat};${dstLon},${dstLat}?overview=false`;
    const response=await fetch(url);
    const data=await response.json();
    if(!data.routes||!data.routes.length){
        throw new Error("No route between source and destination  found");
    }
    const route=data.routes[0];
    return {
        distanceKm:(route.distance/1000).toFixed(2),
        durationMin:Math.ceil(route.duration/60)
    }
}