// components/DriverArrivingCard.jsx
import React from "react";

const DriverArrivingCard = ({ activeRide, onCancelRide }) => {
  if (!activeRide) return null;

  const captainName = activeRide.captain?.name || "Your Captain";
  const captainPhone = activeRide.captain?.phone || "N/A";
  
  const etaMinutes = activeRide.durationMin 
    ? Math.max(2, Math.round(activeRide.durationMin * 0.05)) 
    : 3;

  return (
    <div className="w-full h-full bg-slate-900 text-white p-6 shadow-xl rounded-2xl border border-slate-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div>
            <h2 className="text-lg font-black text-emerald-400 tracking-wide animate-pulse">
              Arriving in {etaMinutes} mins!
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Captain is heading your way.
            </p>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
            En Route
          </span>
        </div>

        <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-xl border border-slate-800/50 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-base text-white shadow-md">
              {captainName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">{captainName}</h4>
              <p className="text-[11px] text-slate-400 font-semibold">★ 4.9 Rating</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fare</p>
            <p className="text-base font-black text-slate-100">₹{activeRide.fare}</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-300 bg-slate-950/30 p-3 rounded-xl border border-slate-800/30">
          <p className="truncate">
            <span className="text-emerald-500 font-bold">🟢 Pickup:</span>{" "}
            {typeof activeRide.pickup === 'string' 
              ? activeRide.pickup 
              : activeRide.pickup?.address || "Selected Pickup Coordinates"}
          </p>
          <p className="truncate">
            <span className="text-rose-500 font-bold">🏁 Dropoff:</span>{" "}
            {typeof activeRide.destination === 'string' 
              ? activeRide.destination 
              : activeRide.destination?.address || "Selected Destination Location"}
          </p>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        <a 
          href={`tel:${captainPhone}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-center text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md"
        >
          📞 Call Captain
        </a>
        <button 
          onClick={onCancelRide}
          className="w-full bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 font-medium py-2.5 rounded-xl transition-all text-xs tracking-wide border border-rose-500/10"
        >
          Cancel Ride Request
        </button>
      </div>
    </div>
  );
};

export default DriverArrivingCard;