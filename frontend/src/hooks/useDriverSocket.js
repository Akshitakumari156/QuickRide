import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useDriverSocket = (token, coords) => {
  const socketRef = useRef(null);
  const [isOnlineState, setIsOnlineState] = useState(false);
  const [incomingRide, setIncomingRide] = useState(null);

  // Effect A: Manages the lifetime connection and event listeners of the socket instance
  useEffect(() => {
    if (!token) return;

    // Replaced hardcoded localhost connection with environment variable configuration
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    
    socketRef.current = io(baseUrl, {
      auth: { token },
      autoConnect: false, 
    });

    const socketInstance = socketRef.current;

    socketInstance.on("connect", () => {
      console.log("🟢 Connected securely to real-time hub:", socketInstance.id);
      // Fallback fallback emission handled dynamically inside Effect B to ensure accuracy
    });

    socketInstance.on("driver:status:updated", (data) => {
      if (data.status === "AVAILABLE") setIsOnlineState(true);
    });

    // 🚕 Catch backend event broadcasts
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
  }, [token]); // Isolated from coords changes to prevent continuous teardown/reconnect cycles

  // Effect B: High-Frequency Telemetry Heartbeat Controller
  useEffect(() => {
    if (!socketRef.current) return;

    // Send a single inline setup sync if the driver switches state or changes location 
    if (isOnlineState && coords?.lat && coords?.lng && socketRef.current.connected) {
      socketRef.current.emit("driver:online", { lat: coords.lat, lng: coords.lng });
    }

    if (!isOnlineState || !coords?.lat || !coords?.lng || !socketRef.current.connected) return;

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