import React, { useState, useRef, useEffect } from "react";
import InputLocation from "./InputLocation";
import SearchingRider from "./SearchingRider";
import DriverArrivingCard from "./DriverArrivingCard";
import socket from "../socket/socket";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faFlagCheckered,
  faClock,
  faRoute,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

const HomeSidebar = ({
  onPickupSelect,
  onDropoffSelect,
  onCheckPrice,
  fareData,
  setFareData, 
  pickupCoords,
  dropoffCoords, 
  error,
}) => {
  const [schedule, setSchedule] = useState("");
  const [searching, setSearching] = useState(false);
  const [activeRide, setActiveRide] = useState(null); // ⚡ NEW: Track accepted rides

  const contentRef = useRef(null);
  const fareRef = useRef(null);
  const searchingRef = useRef(null);

  // ⚡ SOCKET LISTENER: When captain accepts the ride
  useEffect(() => {
    const handleRideAccepted = (payload) => {
      console.log("🎉 RIDE ACCEPTED by captain:", payload);
      setSearching(false); // Stop searching animation
      setActiveRide(payload.ride); // Show driver arriving card
    };

    socket.on("ride:accepted", handleRideAccepted);

    return () => {
      socket.off("ride:accepted", handleRideAccepted);
    };
  }, []);

  // ⚡ HANDLE CANCEL RIDE
  const handleCancelRide = async () => {
    if (!activeRide) return;

    console.log("❌ Cancelling ride:", activeRide._id);
    
    try {
      const token = localStorage.getItem("userToken") || localStorage.getItem("token");
      
      // You may need to create a cancel endpoint on the backend
      const res = await fetch(`http://localhost:5000/api/ride/cancel/${activeRide._id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.ok) {
        setActiveRide(null);
        setFareData(null);
        alert("Ride cancelled successfully");
      } else {
        alert("Failed to cancel ride");
      }
    } catch (err) {
      console.error("❌ Cancel Error:", err);
      alert("Error cancelling ride: " + err.message);
    }
  };

  // ⚡ THE FIX: Reset both fareData and searching when any location input text field modifications occur
  const handleLocationInputChange = () => {
    if (setFareData) {
      setFareData(null);
    }
    setSearching(false);
  };

  useEffect(() => {
    if (fareData && fareRef.current) {
      setTimeout(() => {
        fareRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [fareData]);

  useEffect(() => {
    if (searching && searchingRef.current) {
      setTimeout(() => {
        searchingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [searching]);

  // 🚀 ON-THE-FLY REVERSE GEOCODING TRANSLATION HELPER
  const resolveLocationAddress = async (coords, defaultLabel) => {
    if (!coords) return defaultLabel;

    // Condition A: If the address property is already populated with a real search-text string, use it directly!
    if (coords.address && typeof coords.address === "string" && !coords.address.startsWith("Selected")) {
      return coords.address;
    }

    // Condition B: If the address string is a fallback or missing, invoke your backend cache layer geocoder
    if (coords.lat && coords.lng) {
      try {
        console.log(`🌍 Resolving GPS coordinates to address: [Lat: ${coords.lat}, Lng: ${coords.lng}]`);
        const res = await fetch(`http://localhost:5000/api/location/reverse?lat=${coords.lat}&lng=${coords.lng}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.place) {
            return data.place;
          }
        }
      } catch (err) {
        console.error("⚠️ Local geocoder pipeline bypass or network block:", err.message);
      }
      return `${Number(coords.lat).toFixed(4)}, ${Number(coords.lng).toFixed(4)}`;
    }

    return defaultLabel;
  };

  // 🚀 UPDATED RIDE REQUEST DISPATCH FUNCTION
  const handleConfirmRide = async () => {
    console.log("Confirm Ride clicked");

    if (!pickupCoords || !dropoffCoords || !fareData) {
      console.warn("⚠️ Cannot request ride. Missing required position metrics:", { pickupCoords, dropoffCoords, fareData });
      alert("Please select both locations and calculate the fare price first.");
      return;
    }

    try {
      setSearching(true);
      
      const token = localStorage.getItem("userToken") || localStorage.getItem("token"); 

      // ⚡ RESOLVE ADDRESSES DYNAMICALLY BEFORE DISPATCHING THE PAYLOAD
      const finalPickupAddress = await resolveLocationAddress(pickupCoords, "Selected Pickup Point");
      const finalDestinationAddress = await resolveLocationAddress(dropoffCoords, "Selected Target Destination");

      // Explicitly build the map request parameters format expected by your backend service structure
      const requestPayload = {
        pickup: {
          lat: Number(pickupCoords.lat),
          lng: Number(pickupCoords.lng),
          address: finalPickupAddress // ⚡ Saved text string goes here
        },
        destination: {
          lat: Number(dropoffCoords.lat),
          lng: Number(dropoffCoords.lng),
          address: finalDestinationAddress // ⚡ Saved text string goes here
        }
      };

      console.log("🚀 Dispatched payload to backend matching engine:", requestPayload);

      const res = await fetch("http://localhost:5000/api/ride/request", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(requestPayload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("🔴 Backend Error Output:", errorText);
        
        if (errorText.startsWith("<!DOCTYPE") || errorText.startsWith("<html")) {
          throw new Error(`Backend Server Error (${res.status}). Open your Node.js backend terminal log immediately to look at the error trace!`);
        }
        
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Failed to process ride allocation request.");
      }

      const data = await res.json();
      console.log("🎉 Ride tracking sequence created successfully:", data);

    } catch (err) {
      console.error("❌ Request Error:", err);
      alert(err.message);
      setSearching(false);
    }
  };

  // ⚡ IF RIDE IS ACCEPTED, SHOW DRIVER ARRIVING CARD
  if (activeRide) {
    return (
      <div className="w-full max-w-sm mx-auto bg-white rounded-2xl h-[90%] flex flex-col shadow-xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-white">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Ride Details
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Your driver is on the way
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <DriverArrivingCard
            activeRide={activeRide}
            onCancelRide={handleCancelRide}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl h-[90%] flex flex-col shadow-xl border border-slate-100 overflow-hidden">
      
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-slate-100 bg-white">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Request a ride
        </h2>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          Choose pickup and destination
        </p>
      </div>

      {/* CONTENT PANEL */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto px-6 py-5 space-y-5 scrollbar-thin scrollbar-thumb-slate-200"
      >
        <div className="space-y-3">
          <InputLocation
            icon={faLocationDot}
            description="Pickup location"
            callback={onPickupSelect}
            onInputChange={handleLocationInputChange}
          />

          <InputLocation
            icon={faFlagCheckered}
            description="Drop-off location"
            callback={onDropoffSelect}
            onInputChange={handleLocationInputChange}
          />
        </div>

        {/* Schedule Segment */}
        <div className="bg-slate-50/60 border border-slate-100 rounded-xl p-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Schedule ride <span className="text-slate-400 lowercase font-normal">(optional)</span>
          </label>

          <div className="relative">
            <FontAwesomeIcon
              icon={faClock}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
            />

            <input
              type="datetime-local"
              value={schedule}
              onChange={(e) => {
                setSchedule(e.target.value);
                handleLocationInputChange();
              }}
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-800 font-medium transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {/* Estimated Fare Display Card */}
        {fareData && (
          <div
            ref={fareRef}
            className="rounded-xl border border-slate-100 bg-gradient-to-br from-slate-600 to-[#0b1e30] p-5 shadow-lg shadow-slate-900/10 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <h3 className="text-sm font-semibold text-slate-300 tracking-wide uppercase">
                Estimated Fare
              </h3>

              <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                Best Price
              </span>
            </div>

            {/* Ride Metas */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-semibold text-slate-200 relative z-10">
              <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg p-2.5">
                <FontAwesomeIcon icon={faRoute} className="text-blue-400 text-sm" />
                <span>{fareData.distanceKm} km</span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg p-2.5">
                <FontAwesomeIcon icon={faClock} className="text-blue-400 text-sm" />
                <span>{fareData.durationMin} min</span>
              </div>
            </div>

            {/* Total Payable Block */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
              <div className="text-xs font-medium text-slate-400">
                Total Payable
              </div>

              <div className="text-2xl font-extrabold text-white flex items-center gap-0.5 tracking-tight">
                <FontAwesomeIcon
                  icon={faIndianRupeeSign}
                  className="text-lg text-blue-400"
                />
                {fareData.fare}
              </div>
            </div>

            <p className="mt-3 text-[10px] text-slate-500 font-medium">
              Inclusive of base fare & distance charges
            </p>
          </div>
        )}

        {/* Searching Spinner Drawer */}
        {searching && (
          <div
            ref={searchingRef}
            className="mt-2 border border-slate-100 rounded-xl overflow-hidden shadow-inner"
          >
            <SearchingRider
              onCancel={() => setSearching(false)}
            />
          </div>
        )}
      </div>

      {/* BOTTOM CALL TO ACTION PANEL */}
      <div className="px-6 py-4 border-t border-slate-100 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-semibold text-center py-2 px-3 rounded-lg mb-3 border border-red-100">
            {error}
          </div>
        )}

        {!fareData ? (
          <button
            onClick={onCheckPrice}
            className="w-full bg-gradient-to-r from-blue-900 to-indigo-600 text-white py-3.5 rounded-xl text-base font-bold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform active:scale-[0.99]"
          >
            Check Price
          </button>
        ) : (
          <button
            onClick={handleConfirmRide}
            disabled={searching}
            className="w-full bg-slate-900 text-white py-3.5 rounded-xl text-base font-bold shadow-md hover:bg-slate-800 transition-all duration-300 transform active:scale-[0.99] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {searching ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                Searching...
              </span>
            ) : (
              "Search Rider"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeSidebar;