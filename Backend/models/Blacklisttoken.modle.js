const mongoose=require('mongoose');
const BlacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400 
    }
})
const BlackListTokenModel=mongoose.model("BlackListToken",BlacklistTokenSchema);
module.exports=BlackListTokenModel;