import { useEffect, useState } from "react";
import CaptainMap from "../CaptainMap";
import AvailabilityCard from "../AvailabilityCard";
import useCaptainLocation from "../../hooks/useCaptainLocation";
import StatsCard from "../Statscard";
import socket from "../../socket/socket";

const Dashboard = ({ isOnline, setIsOnline }) => {
  const token = localStorage.getItem("captainToken");

  const { coords, address } = useCaptainLocation(isOnline);
  const [incomingRide, setIncomingRide] = useState(null);

  const stats = [
    { label: "Total Earnings", value: "₹12,450" },
    { label: "Rides Accepted", value: "128" },
    { label: "Rides Rejected", value: "12" },
    { label: "Online Hours", value: "74h" },
  ];

  /* 🔌 SOCKET CONNECT / DISCONNECT */
  useEffect(() => {
    if (isOnline && !socket.connected) {
      socket.connect();
      console.log("🟢 Captain socket connecting...");
    }

    if (!isOnline && socket.connected) {
      socket.disconnect();
      console.log("🔴 Captain socket disconnected");
    }
  }, [isOnline]);

  /* 🔁 ON SOCKET CONNECT → SEND LOCATION ONCE */
  useEffect(() => {
    const handleConnect = () => {
      console.log("🟢 Captain socket connected:", socket.id);

      if (coords) {
        console.log("📍 Sending initial location after connect");
        socket.emit("captain:location", {
          token,
          lat: coords.lat,
          lng: coords.lng,
        });
      }
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [coords, token]);

  /* 📍 LOCATION HEARTBEAT (SAFE) */
  useEffect(() => {
    if (!isOnline || !coords) return;

    const interval = setInterval(() => {
      if (!socket.connected) {
        console.warn("⚠️ Socket not connected, skipping location update");
        return;
      }

      socket.emit("captain:location", {
        token,
        lat: coords.lat,
        lng: coords.lng,
      });

      console.log("📡 Location sent:", coords.lat, coords.lng);
    }, 8000);

    console.log("📍 Location heartbeat started");

    return () => {
      clearInterval(interval);
      console.log("🛑 Location heartbeat stopped");
    };
  }, [coords, isOnline, token]);

  /* 🚕 SOCKET LISTENERS */
  useEffect(() => {
    const onRideRequest = (ride) => {
      console.log("🚕 Ride request received:", ride);
      setIncomingRide(ride);
    };

    const onRideConfirmed = (data) => {
      console.log("✅ Ride confirmed:", data);
      setIncomingRide(null);
      setIsOnline(false);
    };

    const onRideRejected = (data) => {
      console.log("❌ Ride rejected:", data);
      setIncomingRide(null);
    };

    const onRideCancelled = (data) => {
      console.log("❌ Ride cancelled:", data);
      setIncomingRide(null);
    };

    socket.on("ride:request", onRideRequest);
    socket.on("ride:confirmed", onRideConfirmed);
    socket.on("ride:rejected", onRideRejected);
    socket.on("ride:cancelled", onRideCancelled);

    return () => {
      socket.off("ride:request", onRideRequest);
      socket.off("ride:confirmed", onRideConfirmed);
      socket.off("ride:rejected", onRideRejected);
      socket.off("ride:cancelled", onRideCancelled);
    };
  }, [setIsOnline]);

  /* ✅ ACCEPT RIDE */
  const acceptRide = () => {
    if (!incomingRide) return;

    console.log("🟡 Accepting ride:", incomingRide.rideId);

    socket.emit("ride:accept", {
      rideId: incomingRide.rideId,
    });
  };

  return (
    <>
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-1">
        Dashboard Overview
      </h1>

      {/* 📍 LOCATION */}
      <p className="text-gray-600 mb-6">
        📍 Current Location:{" "}
        <span className="font-medium text-gray-800">
          {address || "Fetching location..."}
        </span>
      </p>

      {/* 🚨 INCOMING RIDE CARD */}
      {incomingRide && (
        <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-2">New Ride Request</h3>
          <p className="text-sm mb-3">
            Pickup location received
          </p>
          <button
            onClick={acceptRide}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Accept Ride
          </button>
        </div>
      )}

      {/* STATS + AVAILABILITY */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {stats.map((item, i) => (
          <StatsCard key={i} {...item} />
        ))}

        <AvailabilityCard
          isOnline={isOnline}
          setIsOnline={setIsOnline}
        />
      </div>

      {/* 🗺️ MAP */}
      <div className="bg-white rounded-2xl shadow p-4 h-[400px] mb-8">
        <CaptainMap coords={coords} />
      </div>

      {/* PERFORMANCE */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-2">
          Performance
        </h3>
        <p className="text-gray-500">
          You are performing better than 82% of captains in your city.
        </p>
      </div>
    </>
  );
};

export default Dashboard;
