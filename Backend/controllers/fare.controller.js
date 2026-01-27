const { getDistanceAndETA } = require("../services/map.service");
const { calculateFare } = require("../services/price.service");

exports.calculateRideFare = async (req, res) => {
  try {
    const { srcLat, srcLng, dstLat, dstLng } = req.query;

    const srcLatNum = Number(srcLat);
    const srcLngNum = Number(srcLng);
    const dstLatNum = Number(dstLat);
    const dstLngNum = Number(dstLng);

    if (
      !Number.isFinite(srcLatNum) ||
      !Number.isFinite(srcLngNum) ||
      !Number.isFinite(dstLatNum) ||
      !Number.isFinite(dstLngNum)
    ) {
      return res.status(400).json({
        message: "Invalid or missing coordinates",
      });
    }

    const { distanceKm, durationMin } = await getDistanceAndETA(
      { lat: srcLatNum, lng: srcLngNum },
      { lat: dstLatNum, lng: dstLngNum }
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
    console.error("Fare calculation error:", error);
    return res.status(500).json({
      message: "Error calculating fare",
    });
  }
};
