import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useDriverSocket = (token, coords) => {
  const socketRef = useRef(null);
  const [isOnlineState, setIsOnlineState] = useState(false);
  const [incomingRide, setIncomingRide] = useState(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io("http://localhost:5000", {
      auth: { token },
      autoConnect: false, 
    });

    const socketInstance = socketRef.current;

    socketInstance.on("connect", () => {
      console.log("🟢 Connected securely to real-time hub:", socketInstance.id);
      if (coords?.lat && coords?.lng) {
        socketInstance.emit("driver:online", { lat: coords.lat, lng: coords.lng });
      }
    });

    socketInstance.on("driver:status:updated", (data) => {
      if (data.status === "AVAILABLE") setIsOnlineState(true);
    });

    // 🚕 FIX: Change "ride:request" to match the backend event key name "new-ride-request"
    socketInstance.on("new-ride-request", (ride) => {
      console.log("🎯 Hook caught new ride broadcast:", ride);
      setIncomingRide(ride);
    });
    
    socketInstance.on("ride:confirmed", () => setIncomingRide(null));
    socketInstance.on("ride:rejected", () => setIncomingRide(null));
    socketInstance.on("ride:cancelled", () => setIncomingRide(null));

    socketInstance.on("error", (err) => console.error("❌ Socket validation error:", err.message));

    return () => {
      socketInstance.disconnect();
    };
  }, [token, coords]);

  // 📡 High-Frequency Telemetry Heartbeat Controller
  useEffect(() => {
    if (!isOnlineState || !coords?.lat || !coords?.lng || !socketRef.current?.connected) return;

    const interval = setInterval(() => {
      socketRef.current.emit("driver:location:update", {
        lat: coords.lat,
        lng: coords.lng,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [coords, isOnlineState]);

  const toggleOnline = (shouldGoOnline) => {
    if (!socketRef.current) return;

    if (shouldGoOnline) {
      socketRef.current.connect();
    } else {
      socketRef.current.disconnect();
      setIsOnlineState(false);
      setIncomingRide(null);
    }
  };

  const acceptRide = () => {
    if (!incomingRide || !socketRef.current) return;
    socketRef.current.emit("ride:accept", { rideId: incomingRide.rideId || incomingRide._id });
  };

  return { isOnlineState, toggleOnline, incomingRide, acceptRide };
};