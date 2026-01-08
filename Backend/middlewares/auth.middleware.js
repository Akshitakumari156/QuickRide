// check if the user is authorized or logged in 

const jwt=require('jsonwebtoken')
function auth(req,res,next){
    const token=req.headers.authorization.split(" ")[1]||req.cookies.token;
    if(!token){
        return res.json({
            message:"access denied , no token provided"
        })
    };
    try{
                // decode the token 
                const decoded=jwt.verify(token,process.env.JWT_SECRET);
                req.user=decoded;
                next();
    }
    catch(err){
        return res.status(400).json({
            message:"invalid token"
        })
    }
}
module.exports=auth;