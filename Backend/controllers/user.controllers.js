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
        res.status(400).json({
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

