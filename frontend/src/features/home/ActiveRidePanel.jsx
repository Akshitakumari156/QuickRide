import React from "react";
import DriverArrivingCard from "../ride/DriverArrivingCard";

const ActiveRidePanel = ({ activeRide, onCancelRide }) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-slate-900/90 backdrop-blur-2xl rounded-3xl h-[90%] flex flex-col shadow-2xl border border-white/15 overflow-hidden">
      <div className="px-6 py-5 border-b border-white/10 bg-slate-950/40">
        <h2 className="text-xl font-bold text-white tracking-tight font-display">
          Active Trip Dispatch
        </h2>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          Real-time tracking and captain telemetry
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <DriverArrivingCard activeRide={activeRide} onCancelRide={onCancelRide} />
      </div>
    </div>
  );
};

export default ActiveRidePanel;