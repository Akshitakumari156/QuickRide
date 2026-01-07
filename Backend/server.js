const express=require('express');
const dotenv=require('dotenv');
const userrouter=require('./routes/user.routes')
dotenv.config();
const app=express();
app.use(express.json())
const PORT=process.env.PORT||5000;
connectDB=require('./config/db');
connectDB();
app.use('/api/user',userrouter)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})