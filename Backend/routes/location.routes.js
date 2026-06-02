const express=require('express');
const router=express.Router();
const reversegeocode=require('../controllers/reversegeolocation.controllers');

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 3) {
      return res.json([]);
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&addressdetails=1`;

    console.log("Calling:", url);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "UrbanMove/1.0"
      }
    });

    const data = await response.json();

    return res.json(data);

  } catch (error) {
    console.error("Location API Error:", error);

    return res.status(500).json({
      message: error.message
    });
  }
});
router.get('/reverse',reversegeocode.getAddressFromCoordinates);
module.exports=router