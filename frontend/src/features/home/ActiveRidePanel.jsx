import React from "react";
import DriverArrivingCard from "../ride/DriverArrivingCard";

const ActiveRidePanel = ({ activeRide, onCancelRide }) => {
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
        <DriverArrivingCard activeRide={activeRide} onCancelRide={onCancelRide} />
      </div>
    </div>
  );
};

export default ActiveRidePanel;