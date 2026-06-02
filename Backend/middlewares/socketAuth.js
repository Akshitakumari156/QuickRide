// middleware/socketAuth.js
const jwt = require('jsonwebtoken');

module.exports = (socket, next) => {
  // Extract token from handshake auth or query params
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;

  if (!token) {
    console.error("❌ Socket Auth Failure: No token provided in handshake payload.");
    return next(new Error("Authentication failed: Access Token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_super_secret_jwt_key");
    
    // 1. Extract User ID using your precise decoded format (_id)
    const userId = decoded._id || decoded.id || decoded.userId || decoded.captain?._id;
    
    // 2. Extract or Fallback Role assignment
    let role = decoded.role;
    
    // ⚡ THE FIX: Since raw token only has _id, explicitly force role to 'driver' 
    // if it's connecting through your Captain token system
    if (!role && userId) {
      role = "driver";
    }

    if (role === "captain") {
      role = "driver";
    }

    // Attach verified properties to the socket instance
    socket.userId = userId; 
    socket.role = role; 
    
    next();
  } catch (err) {
    console.error("❌ Socket Auth Failure: Invalid or expired token string signature.", err.message);
    return next(new Error("Authentication failed: Expired or invalid token"));
  }
};