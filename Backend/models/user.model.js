const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
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
userSchema.pre("save",function(){
    if(!this.isModified("password")){
        return ;
    }
    this.password=  bcrypt.hash(this.password,10)
   
 
})
userSchema.methods.generateAuthToken=function(){
   const token=jwt.sign({
        _id:this._id
    },process.env.JWT_SECRET,{
        expiresIn:"1d"
    })
    return token ;
}
userSchema.methods.comparePassword= function(password){
    return  bcrypt.compare(password,this.password)
}
const userModel=mongoose.model("User",userSchema);
module.exports =userModel;