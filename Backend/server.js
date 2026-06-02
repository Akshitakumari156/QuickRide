// Backend/server.js
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const http = require('http');

// 🔌 Real-Time Socket Gateway Orchestrator (Points directly to your folder tree paths!)
const { initsocket } = require('./sockets/index');

// 🗄️ Database Bootstrapper
const connectDB = require('./config/db');

// 🗺️ API Route Definitions
const userrouter = require('./routes/user.routes');
const captainrouter = require('./routes/captain.routes');
const locationRoutes = require('./routes/location.routes');
const distanceRoutes = require('./routes/distance.routes');
const fareRoutes = require('./routes/fare.route');
const rideRequestRoutes = require('./routes/ride.request.routes');

const app = express();
const server = http.createServer(app);

// 🔒 CORS Rules Configuration
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
};

// 🛠️ Foundational Global Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ⚡ Connect to MongoDB
connectDB();

// 🚀 Mount Real-Time WebSocket Server & Bind it globally onto Express App context mapping memory
const io = initsocket(server);
app.set("io", io); 

// 🛣️ REST API Endpoint Route Pipeline
app.use('/api/user', userrouter);
app.use('/api/captain', captainrouter);
app.use('/api/location', locationRoutes);
app.use('/api/route', distanceRoutes); 
app.use('/api/route', fareRoutes);     
app.use('/api/ride', rideRequestRoutes);

const rideAcceptRoutes = require("./routes/ride.accept"); 
app.use("/api/ride", rideAcceptRoutes);

// 🔊 Start Server Engine
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 UrbanMove Engine running smoothly on port ${PORT}`);
});