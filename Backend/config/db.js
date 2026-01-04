const mongoose=require('mongoose');
const connectDB=async()=>{
   try{
     await mongoose.connect(process.env.MONGOURI)
    console.log("Connected to the database successfully");
   }
   catch(err){
        console.log(err,"error in conneyting to the database");
   }
}
module.exports=connectDB