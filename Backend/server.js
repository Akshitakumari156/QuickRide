const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;
connectDB=require('./config/db');
connectDB();
app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})