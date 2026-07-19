import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faRoute,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

const FareSummaryCard = forwardRef(({ fareData }, ref) => {
  return (
    <div
      ref={ref}
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
  );
});

FareSummaryCard.displayName = "FareSummaryCard";

export default FareSummaryCard;