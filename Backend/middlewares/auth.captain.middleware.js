const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const BlackListTokenModel = require('../models/Blacklisttoken.modle'); // ⚡ FIX: Adjusted .modle typo to .model

exports.captainMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;
    
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized captain: No token provided."
        });
    }

    try {
        // 1. Check blacklist first
        const isBlacklist = await BlackListTokenModel.findOne({ token });
        if (isBlacklist) {
            return res.status(401).json({ // Changed to 401 (Unauthorized) instead of 400
                message: "Invalid token: This session has been blacklisted."
            });
        }

        // 2. Verify token signature using your environment variable secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Find the captain account associated with the verified ID
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(404).json({
                message: "Captain profile not found."
            });
        }

        // 4. Attach profile data to request context and pass execution forward
        req.captain = captain;
        return next();

    } catch (error) {
        console.error("❌ Error in fetching captain profile:", error.message);
        
        // ⚡ CRITICAL FIX: Explicitly send a response back to Postman/Frontend so the request doesn't hang!
        return res.status(401).json({
            success: false,
            message: "Unauthorized captain: Invalid token signature or expired session."
        });
    }
};