const { getDistanceAndETA } = require("../services/map.service");
const { calculateFare } = require("../services/price.service");

exports.calculateRideFare = async (req, res) => {
  const { srcLat, srcLon, dstLat, dstLon } = req.query;

  if (!srcLat || !srcLon || !dstLat || !dstLon) {
    return res.status(400).json({ message: "missing coordinates" });
  }

  try {
    const { distanceKm, durationMin } = await getDistanceAndETA(
      { lat: srcLat, lon: srcLon },
      { lat: dstLat, lon: dstLon }
    );

    const fare = calculateFare(
      Number(distanceKm),
      Number(durationMin)
    );

    return res.json({
      distanceKm,
      durationMin,
      fare,
    });
  } catch (error) {
    console.error("fare calculation error:", error);
    return res.status(500).json({ message: "Error calculating fare" });
  }
};
