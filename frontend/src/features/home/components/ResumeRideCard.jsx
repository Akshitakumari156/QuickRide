import React, { useEffect, useState } from "react";
import { FiRefreshCw, FiMapPin, FiNavigation } from "react-icons/fi";

const baseUrl = import.meta.env.VITE_API_URL || "";

const ResumeRideCard = ({
  ride,
  onContinueRide,
  onStartNewRide,
}) => {
  const [pickupAddress, setPickupAddress] = useState("Resolving pickup location...");
  const [destinationAddress, setDestinationAddress] = useState("Resolving destination...");

  const getAddress = async (lat, lng) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/location/reverse?lat=${lat}&lng=${lng}`
      );

      if (!res.ok) {
        return "Unknown location";
      }

      const data = await res.json();

      return data.place || "Unknown location";
    } catch (err) {
      console.error("Reverse geocode error:", err);
      return "Unknown location";
    }
  };

  useEffect(() => {
    if (!ride) return;

    const loadAddresses = async () => {
      try {
        const [pickup, destination] = await Promise.all([
          getAddress(ride.pickup.lat, ride.pickup.lng),
          getAddress(ride.destination.lat, ride.destination.lng),
        ]);

        setPickupAddress(pickup);
        setDestinationAddress(destination);
      } catch (err) {
        console.error(err);
      }
    };

    loadAddresses();
  }, [ride]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-2xl text-white rounded-3xl shadow-2xl border border-white/15 p-6 animate-[toast-in_0.2s_ease-out]">

        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xl shadow-lg shadow-amber-500/10">
            <FiRefreshCw className="animate-[spin_4s_linear_infinite]" />
          </div>

          <div>
            <h2 className="text-lg font-black text-white font-display">
              Unfinished Ride Request
            </h2>

            <p className="text-xs text-slate-400 font-medium">
              You have an active route query pending
            </p>
          </div>
        </div>

        <div className="bg-slate-950/50 rounded-2xl p-4 mb-5 space-y-3.5 border border-white/10 text-xs">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
              <span className="text-emerald-400">●</span> Pickup Coordinates
            </p>
            <p className="font-semibold text-slate-200 break-words line-clamp-2">
              {pickupAddress}
            </p>
          </div>

          <div className="border-t border-white/5 pt-3">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
              <span className="text-rose-400">■</span> Destination
            </p>
            <p className="font-semibold text-slate-200 break-words line-clamp-2">
              {destinationAddress}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={onContinueRide}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-[0.98]"
          >
            Resume Ride Search
          </button>

          <button
            onClick={onStartNewRide}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 py-3 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
          >
            Clear & Start New Route
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResumeRideCard;