const { getDistanceAndETA } = require("../services/map.service");
exports.getDistanceBetweenSrcAndDst = async (req, res) => {
    const { srcLat, srcLon, dstLat, dstLon } = req.query;
    if (!srcLat || !srcLon || !dstLat || !dstLon) {
        return res.status(400).json({ message: "missing coordinates" })
    }
    try {
        const response = await getDistanceAndETA(
        {
            lat: srcLat,
            lon: srcLon
        },
        {
            lat: dstLat,
            lon: dstLon

        }
    )
    return res.json(response);
        
    } catch (error) {
        console.log("error in calculating distance between source and destination ");
        
    }
}