const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const http = require('http');

const { initsocket } = require('./sockets/index');
const connectDB = require('./config/db');

const userrouter = require('./routes/user.routes');
const captainrouter = require('./routes/captain.routes');
const locationRoutes = require('./routes/location.routes');
const distanceRoutes = require('./routes/distance.routes');
const fareRoutes = require('./routes/fare.route');
const rideRequestRoutes = require('./routes/ride.request.routes');
const rideAcceptRoutes = require('./routes/ride.accept');

const app = express();
const server = http.createServer(app);

// Production + Development CORS
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
connectDB();

// Health Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "UrbanMove Backend Running 🚀",
    });
});

// Socket.IO
const io = initsocket(server);
app.set("io", io);

// Routes
app.use('/api/user', userrouter);
app.use('/api/captain', captainrouter);
app.use('/api/location', locationRoutes);
app.use('/api/route', distanceRoutes);
app.use('/api/route', fareRoutes);
app.use('/api/ride', rideRequestRoutes);
app.use('/api/ride', rideAcceptRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 UrbanMove Engine running on port ${PORT}`);
});