const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const captainSchema=new mongoose.Schema({
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
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    vehicle:{
        color:{
        type:String,
          required:true,
        },
        plateNumber:{
            type:String,
            required:true,

        },
        capacity:{
            type:Number,
            required:true,
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["bike","car","auto"]
        }
        

    },
    location:{
        long:{
            type:Number
        },
        lat:{
            type:Number
        }
    }

});
captainSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({
        _id:this._id
    },process.env.JWT_SECRET,{
        expiresIn:"1d"
    })
    return token ;
}
captainSchema.methods.comparePassword=function(password){
    return bcrypt.compare(password,this.password);
}
captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}
const captainModel=mongoose.model("Captain",captainSchema);
module.exports =captainModel;