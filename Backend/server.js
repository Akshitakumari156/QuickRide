const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors')
const http=require('http');
const initsocket=require('./sockets')
const userrouter=require('./routes/user.routes');
const captainrouter=require('./routes/captain.routes');
const locationRoutes=require('./routes/location.routes')
const distanceRoutes=require('./routes/distance.routes')
const fareRoutes=require('./routes/fare.route')
const corsOptions={
    origin:"http://localhost:5173",
    //credentials:true,
    methods:["GET","POST"]
}
const app=express();
const server=http.createServer(app);
initsocket(server);
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
app.use('/api/route',fareRoutes)
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})