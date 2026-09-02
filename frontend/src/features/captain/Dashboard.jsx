import React, { useEffect, useState, useRef } from "react";
import CaptainMap from "./CaptainMap";
import AvailabilityCard from "../ride/AvailabilityCard";
import useCaptainLocation from "../../hooks/useCaptainLocation";
import StatsCard from "../../common/Statscard";
import socket from "../../socket/socket";
import { FiNavigation, FiZap, FiCheck, FiMapPin, FiShield, FiTrendingUp, FiClock, FiAward, FiAlertTriangle } from "react-icons/fi";

const Dashboard = ({ isOnline, setIsOnline }) => {
  const { coords, address } = useCaptainLocation(isOnline);
  const [incomingRide, setIncomingRide] = useState(null);
  const [countdown, setCountdown] = useState(15);
  
  const incomingRideRef = useRef(null);
  useEffect(() => {
    incomingRideRef.current = incomingRide;
  }, [incomingRide]);

  const [activeTrip, setActiveTrip] = useState(null);

  const stats = [
    { label: "Today's Earnings", value: "₹1,450" },
    { label: "Rides Accepted", value: "128" },
    { label: "Completion Rate", value: "98.4%" },
    { label: "Online Hours", value: "74h" },
  ];

  // Incoming ride countdown timer
  useEffect(() => {
    if (!incomingRide) {
      setCountdown(15);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIncomingRide(null);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [incomingRide]);

  useEffect(() => {
    const fetchActiveTrip = async () => {
      try {
        const token = localStorage.getItem("captainToken") || localStorage.getItem("token");
        if (!token) return;
        const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/ride/captain/active`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success && data.ride) {
          setActiveTrip(data.ride);
          setIsOnline(true);
        }
      } catch (err) {
        console.error("Error fetching active trip", err);
      }
    };
    fetchActiveTrip();
  }, [setIsOnline]);

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

  const [userLiveLocation, setUserLiveLocation] = useState(null);

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
    if (!activeTrip) {
      setUserLiveLocation(null);
      return;
    }

    const handleUserLocationUpdate = (data) => {
      setUserLiveLocation({ lat: data.lat, lng: data.lng });
    };

    socket.on("user:location:update", handleUserLocationUpdate);

    return () => {
      socket.off("user:location:update", handleUserLocationUpdate);
    };
  }, [activeTrip]);

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

  const handleCompleteRide = async () => {
    if (!activeTrip) return;
    const token = localStorage.getItem("captainToken") || localStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_API_URL || '';

    try {
      const res = await fetch(`${baseUrl}/api/ride/end`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ rideId: activeTrip._id || activeTrip.rideId })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to complete ride.");
      }

      alert("Ride Completed Successfully!");
      setActiveTrip(null);
      setOtp("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top HUD Banner */}
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-display">
              Driver Command Console
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
              Live HUD
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1 font-medium flex items-center gap-1.5">
            <FiMapPin className="text-emerald-400 text-sm shrink-0" />
            <span>{address || "Precision coordinates synchronized"}</span>
          </p>
        </div>

        {/* Daily Goal Meter */}
        <div className="flex items-center gap-4 bg-slate-950/70 border border-white/10 px-4 py-2.5 rounded-2xl">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Today's Target</p>
            <p className="text-xs font-black text-emerald-400">₹1,450 / ₹2,000 (72%)</p>
          </div>
          <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full w-[72%]" />
          </div>
        </div>
      </div>

      {/* Surge Heat Map Notification */}
      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/25 rounded-2xl px-4 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5 text-amber-300 font-semibold">
          <span className="text-base">🔥</span>
          <span>High Demand Surge in Sector 42 & Tech District — <strong>1.25x Earning Multiplier</strong> active!</span>
        </div>
        <span className="hidden sm:inline-flex text-[10px] font-bold text-amber-400 bg-amber-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
          Surge Active
        </span>
      </div>

      {/* Incoming Ride Alert Box with Countdown */}
      {incomingRide && !activeTrip && (
        <div className="bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border-2 border-blue-500/60 rounded-3xl p-6 shadow-2xl shadow-blue-950/90 animate-[toast-in_0.25s_ease-out] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <span className="flex h-4 w-4 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
              </span>
              <div>
                <h3 className="font-black text-white text-xl font-display">New Ride Request</h3>
                <p className="text-xs text-slate-400">Incoming dispatch broadcast</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Radial countdown indicator */}
              <div className="flex items-center gap-1.5 bg-rose-500/15 border border-rose-500/30 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-300">
                <FiClock className="text-sm" />
                <span>{countdown}s</span>
              </div>
              <span className="text-2xl font-black text-emerald-400 bg-slate-950/80 border border-emerald-500/30 px-5 py-1.5 rounded-2xl shadow-inner font-display">
                ₹{incomingRide.fare}
              </span>
            </div>
          </div>
          
          <div className="space-y-2.5 text-xs text-slate-300 mb-5 font-medium bg-slate-950/60 p-4 rounded-2xl border border-white/10 relative z-10">
            <p className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold text-sm">●</span>
              <span className="font-semibold text-slate-200">{incomingRide.pickupAddressText}</span>
            </p>
            <div className="border-l border-dashed border-slate-700 ml-1.5 h-3 -my-1" />
            <p className="flex items-start gap-2.5">
              <span className="text-rose-400 font-bold text-sm">■</span>
              <span className="font-semibold text-slate-200">{incomingRide.destinationAddressText}</span>
            </p>

            <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-slate-400 font-bold text-xs uppercase tracking-wider">
              <span>{incomingRide.distanceKm || "0"} km Estimated</span>
              <span>~{incomingRide.durationMin || "0"} mins Route</span>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button 
              onClick={acceptRide} 
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:opacity-95 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] cursor-pointer text-sm tracking-wide uppercase"
            >
              Accept Ride & Lock Allocation
            </button>
          </div>
        </div>
      )}

      {/* Active Trip Banner */}
      {activeTrip && (
        <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/15 animate-[toast-in_0.25s_ease-out]">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs uppercase font-black px-4 py-1.5 rounded-full border tracking-wider ${activeTrip.status === "ONGOING" ? "bg-purple-500/15 text-purple-400 border-purple-500/30" : "bg-blue-500/15 text-blue-400 border-blue-500/30"}`}>
              {activeTrip.status === "ONGOING" ? "En Route to Destination" : "Heading to Pickup Point"}
            </span>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Guaranteed Fare</p>
              <p className="text-2xl font-black text-emerald-400 font-display">₹{activeTrip.fare}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs border-t border-white/10 pt-4 mb-5 font-medium bg-slate-950/50 rounded-2xl p-4 border border-white/5">
            <p className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold text-sm">●</span>
              <span className="text-slate-200 font-semibold">
                {typeof activeTrip.pickup === "string" 
                  ? activeTrip.pickup 
                  : activeTrip.pickup?.address || `GPS: [${activeTrip.pickup?.lat?.toFixed(4)}, ${activeTrip.pickup?.lng?.toFixed(4)}]`}
              </span>
            </p>
            <div className="border-l border-dashed border-slate-700 ml-1.5 h-3 -my-1" />
            <p className="flex items-start gap-2.5">
              <span className="text-rose-400 font-bold text-sm">■</span>
              <span className="text-slate-200 font-semibold">
                {typeof activeTrip.destination === "string" 
                  ? activeTrip.destination 
                  : activeTrip.destination?.address || `GPS: [${activeTrip.destination?.lat?.toFixed(4)}, ${activeTrip.destination?.lng?.toFixed(4)}]`}
              </span>
            </p>
          </div>

          {activeTrip.status !== "ARRIVED" && activeTrip.status !== "ONGOING" && (
            <button 
              onClick={handleArrived}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] cursor-pointer"
            >
              Mark Arrived at Pickup
            </button>
          )}

          {activeTrip.status === "ARRIVED" && (
            <div className="mt-2 space-y-3">
              <p className="text-xs text-slate-300 font-medium text-center">Ask passenger for their 4-digit secret OTP to begin trip</p>
              <div className="flex gap-3">
                <input 
                  type="text"
                  maxLength="6"
                  placeholder="ENTER OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="flex-1 bg-slate-950 border border-white/15 rounded-2xl px-4 py-3 text-center text-2xl font-black tracking-[0.25em] text-white placeholder:text-slate-600 placeholder:tracking-normal placeholder:font-medium placeholder:text-sm focus:outline-none focus:border-blue-500 transition-all font-mono"
                />
                <button 
                  onClick={handleStartRide}
                  disabled={!otp || otp.length < 4}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold px-8 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Start Ride
                </button>
              </div>
            </div>
          )}

          {activeTrip.status === "ONGOING" && (
            <button 
              onClick={handleCompleteRide}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all active:scale-[0.98] cursor-pointer"
            >
              Complete Trip & Collect Fare
            </button>
          )}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {stats.map((item, i) => (
          <StatsCard key={i} {...item} />
        ))}

        <AvailabilityCard
          isOnline={isOnline}
          setIsOnline={setIsOnline}
        />
      </div>

      {/* Map telemetry widget */}
      <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/15 p-4 h-[440px] relative overflow-hidden">
        <CaptainMap coords={coords} activeTrip={activeTrip} userLiveLocation={userLiveLocation} />
      </div>

      {/* Performance Benchmark Card */}
      <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white font-display mb-1 flex items-center gap-2">
            <FiTrendingUp className="text-emerald-400" /> Sector Performance Benchmark
          </h3>
          <p className="text-slate-400 text-xs font-medium">
            Your acceptance response and completion reliability is higher than 82% of active captains in this metro zone.
          </p>
        </div>
        <span className="hidden md:inline-flex text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          Tier 1 Gold Partner
        </span>
      </div>
    </div>
  );
};

export default Dashboard;