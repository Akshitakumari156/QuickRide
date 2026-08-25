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
    <>
      <h1 className="text-2xl font-semibold mb-1">Dashboard Overview</h1>

      <p className="text-gray-600 mb-6">
        Current Location:{" "}
        <span className="font-medium text-gray-800">
          {address || "Fetching matching location address telemetry..."}
        </span>
      </p>

      {incomingRide && !activeTrip && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-lg transition-all animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <h3 className="font-bold text-gray-900 text-lg tracking-tight">New Ride Offer</h3>
            </div>
            <span className="text-xl font-black text-gray-900 bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-full shadow-sm">
              ₹{incomingRide.fare}
            </span>
          </div>
          
          <div className="space-y-3 text-sm text-gray-600 mb-5 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">●</span>
              <span className="font-semibold text-gray-900">{incomingRide.pickupAddressText}</span>
            </p>
            <div className="border-l-2 border-dashed border-gray-300 ml-1.5 h-4 -my-2"></div>
            <p className="flex items-start gap-3">
              <span className="text-red-500 font-bold flex-shrink-0 mt-0.5">■</span>
              <span className="font-semibold text-gray-900">{incomingRide.destinationAddressText}</span>
            </p>

            <div className="pt-3 mt-1 border-t border-gray-200 flex items-center justify-between text-gray-500 font-semibold text-xs uppercase tracking-wider">
              <span>{incomingRide.distanceKm || "0"} km</span>
              <span>{incomingRide.durationMin || "0"} mins</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={acceptRide} 
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Accept Ride
            </button>
          </div>
        </div>
      )}

      {activeTrip && (
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-xl border border-gray-200 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs uppercase font-bold px-3 py-1.5 rounded-full border tracking-wider ${activeTrip.status === "ONGOING" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-100 text-gray-700 border-gray-200"}`}>
              {activeTrip.status === "ONGOING" ? "En Route to Dropoff" : "Heading to Pickup"}
            </span>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Fare</p>
              <p className="text-xl font-black text-gray-900">₹{activeTrip.fare}</p>
            </div>
          </div>

          <div className="space-y-4 text-sm border-t border-gray-100 pt-5 mb-5 font-medium bg-gray-50 rounded-xl p-4">
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">●</span>
              <span className="text-gray-900">
                {typeof activeTrip.pickup === "string" 
                  ? activeTrip.pickup 
                  : activeTrip.pickup?.address || `GPS: [${activeTrip.pickup?.lat?.toFixed(4)}, ${activeTrip.pickup?.lng?.toFixed(4)}]`}
              </span>
            </p>
            <div className="border-l-2 border-dashed border-gray-300 ml-1.5 h-4 -my-3"></div>
            <p className="flex items-start gap-3">
              <span className="text-red-500 font-bold flex-shrink-0 mt-0.5">■</span>
              <span className="text-gray-700">
                {typeof activeTrip.destination === "string" 
                  ? activeTrip.destination 
                  : activeTrip.destination?.address || `GPS: [${activeTrip.destination?.lat?.toFixed(4)}, ${activeTrip.destination?.lng?.toFixed(4)}]`}
              </span>
            </p>
          </div>

          {activeTrip.status !== "ARRIVED" && activeTrip.status !== "ONGOING" && (
            <button 
              onClick={handleArrived}
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Arrived at Pickup
            </button>
          )}

          {activeTrip.status === "ARRIVED" && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-3 font-medium text-center">Ask passenger for OTP to start ride</p>
              <div className="flex gap-3">
                <input 
                  type="text"
                  maxLength="6"
                  placeholder="ENTER OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-center text-2xl font-black tracking-[0.2em] text-gray-900 placeholder:text-gray-400 placeholder:tracking-normal placeholder:font-medium placeholder:text-base focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all uppercase"
                />
                <button 
                  onClick={handleStartRide}
                  disabled={otp.length !== 6}
                  className="bg-gray-900 hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold px-8 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  Start Ride
                </button>
              </div>
            </div>
          )}

          {activeTrip.status === "ONGOING" && (
            <button 
              onClick={handleCompleteRide}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
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
        <CaptainMap coords={coords} activeTrip={activeTrip} userLiveLocation={userLiveLocation} />
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