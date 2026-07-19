const axios = require("axios");
const redis = require("../config/redis.config");

const LOCATION_TTL = 60; 

exports.getAddressFromCoordinates = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "lat and lng are required",
      });
    }

    const redisKey = `reverse:${lat}:${lng}`;

    const cached = await redis.get(redisKey);

    if (cached) {
      console.log("Reverse geocode cache hit");
      return res.json(JSON.parse(cached));
    }

    console.log("LocationIQ Reverse Geocode API Call");

    const response = await axios.get(
      "https://us1.locationiq.com/v1/reverse",
      {
        params: {
          key: process.env.LOCATIONIQ_API_KEY,
          lat,
          lon: lng,
          format: "json",
        },
        timeout: 10000,
      }
    );

    const data = response.data;

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
      address.county ||
      data.display_name?.split(",")[0] ||
      "Unknown area";

    const payload = {
      lat: Number(lat),
      lng: Number(lng),
      place,
      updatedAt: Date.now(),
    };

    await redis.set(
      redisKey,
      JSON.stringify(payload),
      "EX",
      LOCATION_TTL
    );

    return res.json(payload);

  } catch (error) {

    console.error(
      "Reverse Geolocation Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message:
        error.response?.data?.error ||
        "Failed to reverse geocode location",
    });
  }
};