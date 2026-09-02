import React, { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faRoute,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { FiCreditCard, FiDollarSign, FiZap, FiChevronDown, FiChevronUp, FiShield } from "react-icons/fi";

const FareSummaryCard = forwardRef(({ fareData }, ref) => {
  const [paymentMode, setPaymentMode] = useState("upi");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const baseMeter = Math.round(Number(fareData.fare) * 0.35) || 30;
  const distanceCharge = Number(fareData.fare) - baseMeter;

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-blue-500/40 bg-gradient-to-br from-slate-900 via-[#0a1222] to-slate-950 p-5 shadow-2xl shadow-blue-950/50 text-white relative overflow-hidden animate-[toast-in_0.2s_ease-out]"
    >
      <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-xs font-black text-white tracking-wider uppercase font-display flex items-center gap-1.5">
            <FiZap className="text-amber-400" />
            <span>Guaranteed Total Fare</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">Locked price before dispatch</p>
        </div>

        <span className="text-[10px] uppercase font-black tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full">
          0% Surge
        </span>
      </div>

      {/* Metrics Row */}
      <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs font-bold text-slate-200 relative z-10">
        <div className="flex items-center gap-2 bg-slate-950/60 border border-white/10 rounded-2xl p-2.5">
          <FontAwesomeIcon icon={faRoute} className="text-blue-400 text-sm" />
          <span>{fareData.distanceKm} km Route</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/60 border border-white/10 rounded-2xl p-2.5">
          <FontAwesomeIcon icon={faClock} className="text-purple-400 text-sm" />
          <span>~{fareData.durationMin} mins Trip</span>
        </div>
      </div>

      {/* Payment Method Switcher */}
      <div className="mt-3.5 pt-3 border-t border-white/10 relative z-10">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          Payment Mode
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setPaymentMode("upi")}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              paymentMode === "upi"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚡ UPI / QR
          </button>
          <button
            type="button"
            onClick={() => setPaymentMode("cash")}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              paymentMode === "cash"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            💵 Cash
          </button>
          <button
            type="button"
            onClick={() => setPaymentMode("wallet")}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              paymentMode === "wallet"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            💳 QuickPay
          </button>
        </div>
      </div>

      {/* Payable Price Banner */}
      <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between relative z-10">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Net Estimated
          </span>
          <button
            type="button"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-[10px] text-blue-400 font-semibold hover:underline flex items-center gap-1 mt-0.5 cursor-pointer"
          >
            <span>{showBreakdown ? "Hide Fare Details" : "View Breakdown"}</span>
            {showBreakdown ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>

        <div className="text-3xl font-black text-emerald-400 flex items-center gap-0.5 tracking-tight font-display">
          <FontAwesomeIcon
            icon={faIndianRupeeSign}
            className="text-lg text-emerald-500/80"
          />
          {fareData.fare}
        </div>
      </div>

      {/* Collapsible Fare Breakdown Details */}
      {showBreakdown && (
        <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-slate-300 font-medium relative z-10 animate-[toast-in_0.15s_ease-out]">
          <div className="flex justify-between">
            <span className="text-slate-400">Base Pickup Meter</span>
            <span>₹{baseMeter}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Distance Charges ({fareData.distanceKm} km)</span>
            <span>₹{distanceCharge}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Tolls & Spatial Access</span>
            <span className="text-emerald-400 font-bold">FREE</span>
          </div>
        </div>
      )}
    </div>
  );
});

FareSummaryCard.displayName = "FareSummaryCard";

export default FareSummaryCard;