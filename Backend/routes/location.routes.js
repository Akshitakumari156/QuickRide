const express=require('express');
const router=express.Router();
router.get('/search',async(req,res)=>{
  try {
      const {q}=req.query;
    if(!q||q.length<3)return res.json([]);
    const url=`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&addressdetails=1`;
    const response=await fetch(url,{
        headers: {
        "User-Agent": "UrbanMove/1.0 (sauraviiitk18@email.com)",
      },
    });
    const data=await response.json();
return res.json(data);
  } catch (error) {
    console.log("error in backend in finding location using api ");
    
  }

})
module.exports=router