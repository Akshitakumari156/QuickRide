const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const BlackListTokenModel = require('../models/Blacklisttoken.modle'); 

exports.captainMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;
    
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized captain: No token provided."
        });
    }

    try {
        const isBlacklist = await BlackListTokenModel.findOne({ token });
        if (isBlacklist) {
            return res.status(401).json({ 
                message: "Invalid token: This session has been blacklisted."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(404).json({
                message: "Captain profile not found."
            });
        }

        req.captain = captain;
        return next();

    } catch (error) {
        console.error("Error in fetching captain profile:", error.message);
        
        return res.status(401).json({
            success: false,
            message: "Unauthorized captain: Invalid token signature or expired session."
        });
    }
};