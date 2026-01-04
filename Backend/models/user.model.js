const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    }
    ,
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        select:false

    },
    socketid:{
        type:String,
    }

});
userSchema.methods.generateAuthToken=function(){
    return jwt.sign({_id:this._id},"jwtSecretKey",{expiresIn:"7d"});
}
module.exports=mongoose.model("User",userSchema);