const express=require('express');
const dotenv=require('dotenv');
const userrouter=require('./routes/user.routes');
const captainrouter=require('./routes/captain.routes');
dotenv.config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT=process.env.PORT||5000;
connectDB=require('./config/db');
connectDB();
app.use('/api/user',userrouter)
app.use('/api/captain',captainrouter)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})