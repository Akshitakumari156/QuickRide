const BlackListTokenModel = require('../models/Blacklisttoken.modle'); 
const captainModel = require('../models/captain.model');
const userModel = require('../models/user.model');
const captainservice = require('../services/captain.service');
const jwt = require('jsonwebtoken');

exports.registerCaptain = async (req, res) => {
    const { email, password, firstname, lastname, vehicle } = req.body;
    try {
        const iscaptainexist = await captainModel.findOne({ email: email });
        if (iscaptainexist) {
            return res.status(409).json({
                message: "captain already exists"
            });
        }
        
        const hashedPassword = await captainModel.hashPassword(password);
        const captain = await captainservice.createcaptain({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            vehicle: {
                color: vehicle.color,
                plateNumber: vehicle.plateNumber,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        });

        const token = captain.generateAuthToken();
        res.status(201).json({
            message: "captain registered successfully",
            token,
            captain: {
                id: captain._id,
                firstname: captain.firstname,
                email: captain.email
            }
        });
        
    } catch (error) {
        console.log("error in registering captain", error);
        res.status(500).json({ message: "Internal server error during registration." });
    }
};

exports.logincaptain = async (req, res) => {
    const { email, password } = req.body;
    try {
        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(404).json({
                message: "captain not found"
            });
        }
        
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({    
                message: "invalid password"
            });
        }
        
        const token = captain.generateAuthToken();
        res.status(200).json({
            message: "captain login successful",
            token,
            captain: {
                id: captain._id,
                firstname: captain.firstname,
                email: captain.email
            }
        });

    } catch (error) {
        console.log("error in captain login", error);
        res.status(500).json({ message: "Internal server error during login." });
    }
};

exports.captainProfile = async (req, res, next) => {
   return res.status(200).json(req.captain);
};

exports.logoutCaptain = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;
    res.clearCookie('token');
    
    if (token) {
        await BlackListTokenModel.create({ token });
    }
    
    return res.status(200).json({
        message: "captain logged out successfully"
    });
};

exports.getNearbyCaptains = async (req, res, next) => {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({
                success: false,
                message: "Missing parameter strings: 'lat' and 'lng' query fields are required."
            });
        }

        const nearbyCaptains = await captainservice.findNearbyCaptains(lat, lng);

        return res.status(200).json({
            success: true,
            count: nearbyCaptains.length,
            captains: nearbyCaptains
        });

    } catch (error) {
        console.error("Error in getNearbyCaptains matching sequence controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal tracking server anomaly crashed the lookup thread request."
        });
    }
};