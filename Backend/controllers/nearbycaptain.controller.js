exports.nearbycaptain=async(req,res)=>{
    const {lat,lng}=req.query;
    try {
        const nearbyCaptains = await captainService.findNearbyCaptains(lat, lng);
        res.status(200).json({ nearbyCaptains });
    } catch (error) {
        console.log("error in calculating nearby captain");
        res.status(500).json({ error: "Internal server error" });
    }
}