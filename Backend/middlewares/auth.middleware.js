// check if the user is authorized or logged in 

const jwt=require('jsonwebtoken');
const userModel = require('../models/user.model');
const BlackListTokenModel = require('../models/Blacklisttoken.modle');

async function auth(req, res, next) {

    const token =
        req.headers.authorization?.split(" ")[1] ||
        req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "Access denied, no token provided"
        });
    }

    const isblacklistedtoken =
        await BlackListTokenModel.findOne({ token });

    if (isblacklistedtoken) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await userModel.findById(
            decoded._id
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        req.user = user;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }
}
module.exports=auth;