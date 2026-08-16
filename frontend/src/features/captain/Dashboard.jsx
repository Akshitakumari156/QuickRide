import React, { useEffect, useState, useRef } from "react";
import CaptainMap from "./CaptainMap";
import AvailabilityCard from "../ride/AvailabilityCard";
import useCaptainLocation from "../../hooks/useCaptainLocation";
import StatsCard from "../../common/Statscard";
import socket from "../../socket/socket";

const Dashboard = ({ isOnline, setIsOnline }) => {
  const { coords, address } = useCaptainLocation(isOnline);
  const [incomingRide, setIncomingRide] = useState(null);
  
  const incomingRideRef = useRef(null);
  useEffect(() => {
    incomingRideRef.current = incomingRide;
  }, [incomingRide]);

  const [activeTrip, setActiveTrip] = useState(null);

  const stats = [
    { label: "Total Earnings", value: "₹12,450" },
    { label: "Rides Accepted", value: "128" },
    { label: "Rides Rejected", value: "12" },
    { label: "Online Hours", value: "74h" },
  ];

  useEffect(() => {
    if (isOnline) {
      if (!socket.connected) {
        const token = localStorage.getItem("captainToken") || localStorage.getItem("token");
        socket.auth = { token };
        socket.connect();
        console.log("Captain socket initiating handshake...");
      } else {
        socket.emit("join:room", { roomId: "captains" });
        console.log("Captain explicitly verified in broadcast room pool.");
      }
    } else {
      if (socket.connected) {
        socket.disconnect();
        console.log("Captain socket explicitly disconnected.");
      }
    }
  }, [isOnline]);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Captain socket handshaked with connection ID:", socket.id);
      socket.emit("join:room", { roomId: "captains" });

      if (coords?.lat && coords?.lng) {
        socket.emit("driver:online", {
          lat: coords.lat,
          lng: coords.lng,
        });
      }
    };

    socket.on("connect", handleConnect);

    if (socket.connected && isOnline) {
      socket.emit("join:room", { roomId: "captains" });
      if (coords?.lat && coords?.lng) {
        socket.emit("driver:online", {
          lat: coords.lat,
          lng: coords.lng,
        });
      }
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [coords, isOnline]);

  useEffect(() => {
    if (!isOnline || !coords?.lat || !coords?.lng) return;

    const interval = setInterval(() => {
      if (!socket.connected) return;

      socket.emit("driver:location:update", {
        lat: coords.lat,
        lng: coords.lng,
        rideId: activeTrip?._id || activeTrip?.rideId
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [coords, isOnline, activeTrip]);

  useEffect(() => {
    const onRideRequest = async (payload) => {
      console.log("Incoming real-time ride offer captured on stream:", payload);
      
      const ride = payload.ride || payload;
      if (!ride) return;

      let pickupText = "Loading pickup address details...";
      let destinationText = "Loading destination address details...";

      const baseUrl = import.meta.env.VITE_API_URL || '';

      try {
        if (ride.pickup && typeof ride.pickup === 'object' && ride.pickup.lat && ride.pickup.lng) {
          const pickupRes = await fetch(
            `${baseUrl}/api/location/reverse?lat=${ride.pickup.lat}&lng=${ride.pickup.lng}`
          );
          if (pickupRes.ok) {
            const data = await pickupRes.json();
            pickupText = data.place || pickupText;
          } else {
            pickupText = `Lat: ${ride.pickup.lat.toFixed(4)}, Lng: ${ride.pickup.lng.toFixed(4)}`;
          }
        } else if (typeof ride.pickup === 'string') {
          pickupText = ride.pickup;
        }

        if (ride.destination && typeof ride.destination === 'object' && ride.destination.lat && ride.destination.lng) {
          const destRes = await fetch(
            `${baseUrl}/api/location/reverse?lat=${ride.destination.lat}&lng=${ride.destination.lng}`
          );
          if (destRes.ok) {
            const data = await destRes.json();
            destinationText = data.place || destinationText;
          } else {
            destinationText = `Lat: ${ride.destination.lat.toFixed(4)}, Lng: ${ride.destination.lng.toFixed(4)}`;
          }
        } else if (typeof ride.destination === 'string') {
          destinationText = ride.destination;
        }

      } catch (err) {
        console.error("Address translation fallback executed:", err.message);
        pickupText = typeof ride.pickup === 'string' ? ride.pickup : "Selected Pickup Target Location";
        destinationText = typeof ride.destination === 'string' ? ride.destination : "Selected Destination Target Location";
      }
            setIncomingRide({
        ...ride,
        pickupAddressText: pickupText,
        destinationAddressText: destinationText
      });
    };

    const onRideConfirmed = (data) => {
      const currentRide = incomingRideRef.current;
      const currentOfferId = currentRide?.rideId || currentRide?._id;
      
      if (data && currentOfferId === data.rideId) {
        console.log("Ride target claimed across network. Dropping popup map card offer state.");
        setIncomingRide(null);
      }
    };

    socket.on("ride:request", onRideRequest);
    socket.on("ride:confirmed", onRideConfirmed);

    return () => {
      socket.off("ride:request", onRideRequest);
      socket.off("ride:confirmed", onRideConfirmed);
    };
  }, []);

  const acceptRide = async () => {
    if (!incomingRide) return;
    
    const targetRideId = incomingRide.rideId || incomingRide._id;
    const token = localStorage.getItem("captainToken") || localStorage.getItem("token");

    console.log("Initiating dual-layer atomic validation check for rideId:", targetRideId);

    const baseUrl = import.meta.env.VITE_API_URL || '';

    try {
      socket.emit("ride:accept", { rideId: targetRideId });

      const res = await fetch(`${baseUrl}/api/ride/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ rideId: targetRideId })
      });

      const responseText = await res.text();
      let data = {};
      
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Server returned HTML/Invalid response (${res.status}). Verify your backend is running.`);
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to secure lock confirmation rules.");
      }

      console.log("Success! Concurrency lock acquired. Ride bound to your profile:", data.ride);
      
      setActiveTrip(data.ride);
      setIncomingRide(null);

    } catch (err) {
      console.error("Ride acceptance allocation failure:", err.message);
      alert(err.message);
      setIncomingRide(null); 
    }
  };

  const [otp, setOtp] = useState("");

  const handleArrived = async () => {
    if (!activeTrip) return;
    const token = localStorage.getItem("captainToken") || localStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_API_URL || '';

    try {
      const res = await fetch(`${baseUrl}/api/ride/arrive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ rideId: activeTrip._id || activeTrip.rideId })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to notify passenger.");
      }

      setActiveTrip(prev => ({ ...prev, status: "ARRIVED" }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStartRide = async () => {
    if (!activeTrip || !otp) return;
    const token = localStorage.getItem("captainToken") || localStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_API_URL || '';

    try {
      const res = await fetch(`${baseUrl}/api/ride/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ rideId: activeTrip._id || activeTrip.rideId, otp })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to start ride.");
      }

      setActiveTrip(prev => ({ ...prev, status: "ONGOING" }));
      alert("Ride Started Successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-1">Dashboard Overview</h1>

      <p className="text-gray-600 mb-6">
        Current Location:{" "}
        <span className="font-medium text-gray-800">
          {address || "Fetching matching location address telemetry..."}
        </span>
      </p>

      {incomingRide && !activeTrip && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 mb-6 shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-amber-900 text-base">New Ride Offer Detected</h3>
            <span className="text-xl font-extrabold text-slate-900 bg-white border border-amber-200 px-3 py-1 rounded-full shadow-sm">
              ₹{incomingRide.fare}
            </span>
          </div>
          
          <div className="space-y-2 text-sm text-slate-700 mb-4 font-medium">
            <p className="flex items-start gap-1">
              <span className="text-emerald-600 font-bold flex-shrink-0">From:</span>{" "}
              <span className="font-semibold text-slate-900">{incomingRide.pickupAddressText}</span>
            </p>

            <p className="flex items-start gap-1">
              <span className="text-rose-600 font-bold flex-shrink-0">To:</span>{" "}
              <span className="font-semibold text-slate-900">{incomingRide.destinationAddressText}</span>
            </p>

            <p className="text-gray-500 font-semibold mt-1">
              Metrics: {incomingRide.distanceKm || "0"} km | {incomingRide.durationMin || "0"} mins
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={acceptRide} 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.99]"
            >
              Accept Ride Offer
            </button>
          </div>
        </div>
      )}

      {activeTrip && (
        <div className="bg-slate-950 text-white rounded-2xl p-5 mb-6 shadow-xl border border-slate-800 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs uppercase font-bold px-2.5 py-1 rounded-full border tracking-wider ${activeTrip.status === "ONGOING" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30"}`}>
              {activeTrip.status === "ONGOING" ? "Job Active: En Route to Dropoff" : "Job Active: Heading to Pickup"}
            </span>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fare Collection</p>
              <p className="text-lg font-black text-emerald-400">₹{activeTrip.fare}</p>
            </div>
          </div>

          <div className="space-y-2.5 text-sm border-t border-slate-900 pt-4 mb-4 text-slate-300 font-medium">
            <p className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold flex-shrink-0">Pickup:</span>
              <span className="text-slate-100">
                {typeof activeTrip.pickup === "string" 
                  ? activeTrip.pickup 
                  : activeTrip.pickup?.address || `GPS Coordinates: [${activeTrip.pickup?.lat?.toFixed(4)}, ${activeTrip.pickup?.lng?.toFixed(4)}]`}
              </span>
            </p>

            <p className="flex items-start gap-2">
              <span className="text-rose-500 font-bold flex-shrink-0">Destination:</span>
              <span className="text-slate-400">
                {typeof activeTrip.destination === "string" 
                  ? activeTrip.destination 
                  : activeTrip.destination?.address || `GPS Coordinates: [${activeTrip.destination?.lat?.toFixed(4)}, ${activeTrip.destination?.lng?.toFixed(4)}]`}
              </span>
            </p>
          </div>

          {activeTrip.status !== "ARRIVED" && activeTrip.status !== "ONGOING" && (
            <button 
              onClick={handleArrived}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.99]"
            >
              Arrived at Pickup
            </button>
          )}

          {activeTrip.status === "ARRIVED" && (
            <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
              <p className="text-sm text-slate-300 mb-2 font-medium text-center">Ask passenger for OTP to start ride</p>
              <div className="flex gap-2">
                <input 
                  type="text"
                  maxLength="6"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-center text-xl font-bold tracking-widest text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
                <button 
                  onClick={handleStartRide}
                  disabled={otp.length !== 6}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold px-6 rounded-xl shadow-md transition-all active:scale-[0.99]"
                >
                  Start Ride
                </button>
              </div>
            </div>
          )}

          {activeTrip.status === "ONGOING" && (
            <button 
              onClick={() => alert("Complete Ride functionality pending...")}
              className="w-full mt-4 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.99]"
            >
              Complete Ride
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {stats.map((item, i) => (
          <StatsCard key={i} {...item} />
        ))}

        <AvailabilityCard
          isOnline={isOnline}
          setIsOnline={setIsOnline}
        />
      </div>

      <div className="bg-white rounded-2xl shadow border border-slate-100 p-4 h-[400px] mb-8">
        <CaptainMap coords={coords} activeTrip={activeTrip} />
      </div>

      <div className="bg-white rounded-2xl shadow border border-slate-100 p-6">
        <h3 className="text-lg font-semibold mb-2 text-slate-800">Performance Metric</h3>
        <p className="text-gray-500 font-medium text-sm">
          You are performing better than 82% of captains in your active city sector grid.
        </p>
      </div>
    </>
  );
};

export default Dashboard;