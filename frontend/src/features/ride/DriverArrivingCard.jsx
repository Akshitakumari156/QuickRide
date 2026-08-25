// components/DriverArrivingCard.jsx
import React from "react";

const DriverArrivingCard = ({ activeRide, onCancelRide }) => {
  if (!activeRide) return null;

  const captainName = activeRide.captain?.name || "Your Captain";
  const captainPhone = activeRide.captain?.phone || "N/A";
  
  const etaMinutes = activeRide.durationMin 
    ? Math.max(2, Math.round(activeRide.durationMin * 0.05)) 
    : 3;

  let title = `Arriving in ${etaMinutes} mins!`;
  let subtitle = "Captain is heading your way.";
  let badgeText = "En Route";

  if (activeRide.status === "ARRIVED") {
    title = "Captain has Arrived!";
    subtitle = "Please provide your OTP to start.";
    badgeText = "Arrived";
  } else if (activeRide.status === "ONGOING") {
    title = "Ride in Progress";
    subtitle = "Have a safe journey.";
    badgeText = "Ongoing";
  }

  return (
    <div className="w-full h-full bg-white text-gray-900 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[2.5rem] md:rounded-2xl border-t border-gray-100 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
          <div>
            <h2 className={`text-xl font-bold tracking-tight ${activeRide.status === 'ONGOING' ? 'text-gray-900' : 'text-blue-600'}`}>
              {title}
            </h2>
            <p className="text-sm text-gray-500 font-medium mt-1">
              {subtitle}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${activeRide.status === 'ONGOING' ? 'bg-gray-100 text-gray-600 border border-gray-200' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
            {badgeText}
          </span>
        </div>

        {activeRide.otp && activeRide.status !== "ONGOING" && (
          <div className="mb-5 bg-blue-50 rounded-2xl p-5 border border-blue-100 flex flex-col items-center justify-center shadow-inner">
            <span className="text-xs text-blue-600/80 font-bold uppercase tracking-widest mb-1.5">Your OTP</span>
            <span className="text-4xl font-black tracking-[0.25em] text-blue-700 bg-white px-6 py-2 rounded-xl shadow-sm border border-blue-100/50">
              {activeRide.otp}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-md">
              {captainName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">{captainName}</h4>
              <p className="text-xs text-yellow-500 font-bold flex items-center gap-1 mt-0.5">
                <span>★</span> 4.9 Rating
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Fare</p>
            <p className="text-xl font-black text-gray-900">₹{activeRide.fare}</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-700 font-medium bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
          <p className="flex items-start gap-3 truncate">
            <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">●</span>
            <span className="truncate">
              {typeof activeRide.pickup === 'string' 
                ? activeRide.pickup 
                : activeRide.pickup?.address || "Selected Pickup Coordinates"}
            </span>
          </p>
          <div className="border-l-2 border-dashed border-gray-300 ml-1.5 h-3 -my-2.5"></div>
          <p className="flex items-start gap-3 truncate">
            <span className="text-red-500 font-bold flex-shrink-0 mt-0.5">■</span>
            <span className="truncate">
              {typeof activeRide.destination === 'string' 
                ? activeRide.destination 
                : activeRide.destination?.address || "Selected Destination Location"}
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <a 
          href={`tel:${captainPhone}`}
          className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-black border border-gray-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98]"
        >
          <span className="text-lg">📞</span> Call Captain
        </a>
        {activeRide.status !== "ONGOING" && (
          <button 
            onClick={onCancelRide}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-xl transition-all text-sm tracking-wide active:scale-[0.98]"
          >
            Cancel Ride
          </button>
        )}
      </div>
    </div>
  );
};

export default DriverArrivingCard;