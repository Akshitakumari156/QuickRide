const BlackListTokenModel = require('../models/Blacklisttoken.modle');
const userModel=require('../models/user.model')
exports.registeruser=async(req,res)=>{
    const{email,password,firstname,lastname}=req.body;
if(!email||!password||!firstname){
   return  res.status(400).json("please enter all details");
}
try{
    const existinguser=await userModel.findOne({email});
if(existinguser){
    return res.status(409).json("user already exists")
}
const user=await userModel.create({
    email:email,
    password:password,
    firstname:firstname,
    lastname:lastname
})

const token=user.generateAuthToken();
res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
        id: user._id,
        firstname: user.firstname,
        email: user.email,
    },
});
}
catch(err){
    console.log("error occur in routed",err)
}
}

exports.loginuser=async (req,res)=>{
    const{email,password}=req.body;
    const user= await userModel.findOne({email}).select("+password");
    if(!user){
        res.status(404).json({
            message:"user not found "
        })
    }
    else {
       const isMatch=await user.comparePassword(password);
       if(!isMatch){
        console.log("error here ")
       return  res.status(400).json({
             message:"invalid password"
        })
       }
       else {
        console.log("token is generated")
        const token=user.generateAuthToken();
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                email: user.email,
            },
        });
    } 
    }

}
exports.getprofile=async(req,res,next)=>{
    return res.status(200).json(req.user);
}


exports.logoutuser=async(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]||req.cookies.token;
    res.clearCookie("token");
    await BlackListTokenModel.create({token});
    return res.status(200).json({
        message:"user logged out successfully"
    });

}

exports.updateProfile = async (req, res, next) => {
    try {
        const { firstname, lastname } = req.body;
        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            { firstname, lastname },
            { new: true, runValidators: true }
        );
        res.status(200).json({ success: true, user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }, message: "Profile updated successfully" });
    } catch (err) {
        next(err);
    }
};

exports.updatePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await userModel.findById(req.user._id).select("+password");
        
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid current password" });
        }
        
        user.password = newPassword;
        await user.save();
        
        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (err) {
        next(err);
    }
};

exports.deleteAccount = async (req, res, next) => {
    try {
        await userModel.findByIdAndDelete(req.user._id);
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Account deleted successfully" });
    } catch (err) {
        next(err);
    }
};