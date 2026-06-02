const express=require('express');
const router=express.Router();
const reversegeocode=require('../controllers/reversegeolocation.controllers');
const axios = require("axios");

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 3) {
      return res.json([]);
    }

    const response = await axios.get(
      "https://us1.locationiq.com/v1/search",
      {
        params: {
          key: process.env.LOCATIONIQ_API_KEY,
          q,
          format: "json",
          limit: 5,
        },
      }
    );

    return res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      message: error.message,
    });
  }
});
router.get('/reverse',reversegeocode.getAddressFromCoordinates);
module.exports=router