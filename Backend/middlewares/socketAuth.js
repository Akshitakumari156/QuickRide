const jwt = require('jsonwebtoken');

module.exports = (socket, next) => {
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;

  if (!token) {
    console.error("Socket Auth Failure: No token provided in handshake payload.");
    return next(new Error("Authentication failed: Access Token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_super_secret_jwt_key");
    
    const userId = decoded._id || decoded.id || decoded.userId || decoded.captain?._id;
    
    let role = decoded.role;
    
    if (!role && userId) {
      role = "driver";
    }

    if (role === "captain") {
      role = "driver";
    }

    socket.userId = userId; 
    socket.role = role; 
    
    next();
  } catch (err) {
    console.error("Socket Auth Failure: Invalid or expired token string signature.", err.message);
    return next(new Error("Authentication failed: Expired or invalid token"));
  }
};