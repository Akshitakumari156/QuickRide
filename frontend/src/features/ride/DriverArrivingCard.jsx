// components/DriverArrivingCard.jsx
import React, { useState } from "react";
import { FiPhone, FiMapPin, FiCheckCircle, FiShield, FiShare2, FiAlertCircle } from "react-icons/fi";

const DriverArrivingCard = ({ activeRide, onCancelRide }) => {
  const [copied, setCopied] = useState(false);
  const [showSafetySheet, setShowSafetySheet] = useState(false);

  if (!activeRide) return null;

  const captainName = activeRide.captain?.name || activeRide.captain?.firstname ? `${activeRide.captain?.firstname || ''} ${activeRide.captain?.lastname || ''}`.trim() : "Verified Captain";
  const captainPhone = activeRide.captain?.phone || "+91 98765 43210";
  const vehiclePlate = activeRide.captain?.vehicle?.plate || "DL 01 AB 8921";
  const vehicleModel = activeRide.captain?.vehicle?.vehicleType ? `${activeRide.captain.vehicle.vehicleType.toUpperCase()} • White Sedan` : "QuickGo Certified Car";
  
  const etaMinutes = activeRide.durationMin 
    ? Math.max(2, Math.round(activeRide.durationMin * 0.05)) 
    : 3;

  let title = `Arriving in ${etaMinutes} mins`;
  let subtitle = "Captain is heading to your pickup location";
  let badgeClass = "bg-blue-500/15 text-blue-400 border-blue-500/30";
  let badgeText = "En Route";
  let stepIndex = 2; // 1: Matched, 2: En Route, 3: Arrived, 4: In Progress

  if (activeRide.status === "ARRIVED") {
    title = "Captain Has Arrived!";
    subtitle = "Please share your secret OTP to start journey";
    badgeClass = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    badgeText = "At Pickup";
    stepIndex = 3;
  } else if (activeRide.status === "ONGOING") {
    title = "Trip in Progress";
    subtitle = "Safe journey. Live telemetry stream active.";
    badgeClass = "bg-purple-500/15 text-purple-400 border-purple-500/30";
    badgeText = "Live Ride";
    stepIndex = 4;
  }

  const handleShareTrip = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`I'm riding with QuickRide. Captain ${captainName}, Plate ${vehiclePlate}. Tracking link active.`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      alert(`Trip details: Captain ${captainName} (${vehiclePlate})`);
    }
  };

  return (
    <div className="w-full h-full bg-slate-900/95 backdrop-blur-2xl text-white p-5 shadow-2xl rounded-3xl md:rounded-3xl border border-white/15 flex flex-col justify-between animate-[toast-in_0.25s_ease-out]">
      <div>
        {/* Status Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-3 mb-3">
          <div>
            <h2 className="text-lg font-black tracking-tight text-white font-display">
              {title}
            </h2>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              {subtitle}
            </p>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border ${badgeClass}`}>
            {badgeText}
          </span>
        </div>

        {/* 4-Step Trip Lifecycle Progress Bar */}
        <div className="mb-4 bg-slate-950/50 p-2.5 rounded-2xl border border-white/10">
          <div className="grid grid-cols-4 gap-1 relative text-center">
            {["Matched", "En Route", "At Pickup", "On Trip"].map((step, idx) => {
              const current = idx + 1;
              const isPassed = current <= stepIndex;
              const isCurrent = current === stepIndex;
              return (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-full h-1.5 rounded-full mb-1.5 transition-all ${
                      isPassed ? (isCurrent ? "bg-emerald-400 shadow-sm shadow-emerald-400/50" : "bg-blue-500") : "bg-slate-800"
                    }`}
                  />
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${isPassed ? "text-white" : "text-slate-600"}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secret Start OTP Badge */}
        {activeRide.otp && activeRide.status !== "ONGOING" && (
          <div className="mb-3.5 bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 rounded-2xl p-3.5 border border-blue-500/40 flex flex-col items-center justify-center shadow-lg shadow-blue-950/60">
            <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
              <FiShield className="text-blue-400" /> Share OTP with Driver to Start
            </span>
            <span className="text-2xl font-black tracking-[0.25em] text-white bg-slate-950/90 px-6 py-1 rounded-xl border border-white/20 font-mono shadow-inner">
              {activeRide.otp}
            </span>
          </div>
        )}

        {/* Driver profile and vehicle details */}
        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-white/10 mb-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-base text-white shadow-lg shadow-blue-600/30 border border-white/20">
                {captainName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm font-display">{captainName}</h4>
                <p className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                  <span>★</span> 4.9 Verified Captain
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Fare</p>
              <p className="text-base font-black text-emerald-400 font-display">₹{activeRide.fare}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-xs font-semibold">
            <span className="text-slate-300 text-[11px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
              {vehiclePlate}
            </span>
            <span className="text-[10px] text-slate-400">
              {vehicleModel}
            </span>
          </div>
        </div>

        {/* Pickup & Destination timeline */}
        <div className="space-y-1.5 text-xs text-slate-300 font-medium bg-slate-950/40 p-3 rounded-2xl border border-white/10">
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold text-xs mt-0.5">●</span>
            <span className="truncate font-semibold text-slate-200 text-[11px]">
              {typeof activeRide.pickup === 'string' 
                ? activeRide.pickup 
                : activeRide.pickup?.address || "Pickup Location"}
            </span>
          </div>
          <div className="border-l border-dashed border-slate-700 ml-1 h-2 -my-0.5" />
          <div className="flex items-start gap-2">
            <span className="text-rose-400 font-bold text-xs mt-0.5">■</span>
            <span className="truncate font-semibold text-slate-200 text-[11px]">
              {typeof activeRide.destination === 'string' 
                ? activeRide.destination 
                : activeRide.destination?.address || "Destination Location"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons & Safety Tools */}
      <div className="space-y-2 mt-3 pt-3 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2">
          <a 
            href={`tel:${captainPhone}`}
            className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 text-xs active:scale-[0.98] cursor-pointer"
          >
            <FiPhone />
            <span>Call Driver</span>
          </a>

          <button
            type="button"
            onClick={handleShareTrip}
            className="flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-800 border border-white/15 text-slate-300 hover:text-white font-bold py-2.5 rounded-xl transition-all text-xs active:scale-[0.98] cursor-pointer"
          >
            <FiShare2 />
            <span>{copied ? "Link Copied!" : "Share Live Trip"}</span>
          </button>
        </div>

        {activeRide.status !== "ONGOING" && (
          <button 
            onClick={onCancelRide}
            className="w-full bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 font-bold py-2 rounded-xl transition-all text-xs tracking-wide active:scale-[0.98] cursor-pointer"
          >
            Cancel Trip Request
          </button>
        )}
      </div>
    </div>
  );
};

export default DriverArrivingCard;