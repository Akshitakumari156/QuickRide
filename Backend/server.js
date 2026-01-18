const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors')
const userrouter=require('./routes/user.routes');
const captainrouter=require('./routes/captain.routes');
const locationRoutes=require('./routes/location.routes')
const distanceRoutes=require('./routes/distance.routes')
const corsOptions={
    origin:"http://localhost:5173",
    //credentials:true,
    methods:["GET","POST"]
}
const app=express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT=process.env.PORT||5000;
connectDB=require('./config/db');
connectDB();
app.use('/api/user',userrouter)
app.use('/api/captain',captainrouter)
app.use('/api/location',locationRoutes)
app.use('/api/route',distanceRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})