const redis = require("../config/redis.config");

const LOCATION_TTL = 60; // seconds

exports.getAddressFromCoordinates = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "lat and lng are required",
      });
    }

    // ✅ Cache by coordinates (NOT captain)
    const redisKey = `reverse:${lat}:${lng}`;

    const cached = await redis.get(redisKey);
    if (cached) {
      console.log("📦 Reverse geocode cache hit");
      return res.json(JSON.parse(cached));
    }

    console.log("🌍 Reverse geocode API call");

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`,
      {
        headers: {
          "User-Agent": "UrbanMove/1.0 (contact@urbanmove.app)",
          "Accept-Language": "en-IN,en;q=0.9",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Nominatim API failed");
    }

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
      lat: Number(lat),
      lng: Number(lng),
      place,
      updatedAt: Date.now(),
    };

    await redis.set(redisKey, JSON.stringify(payload), "EX", LOCATION_TTL);

    return res.json(payload);

  } catch (error) {
    console.error("❌ Reverse geolocation error:", error);

    return res.status(500).json({
      message: "Failed to reverse geocode location",
    });
  }
};
