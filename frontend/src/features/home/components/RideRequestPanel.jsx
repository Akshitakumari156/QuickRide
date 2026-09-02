import React, { useEffect, useRef, useState } from "react";
import InputLocation from "../../ride/InputLocation";
import SearchingRider from "../../ride/SearchingRider";
import ScheduleInput from "../ScheduleInput";
import FareSummaryCard from "../FareSummaryCard";
import { faLocationDot, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { FiNavigation, FiZap, FiCheck, FiShield } from "react-icons/fi";

const RideRequestPanel = ({
  onPickupSelect,
  onDropoffSelect,
  onCheckPrice,
  onConfirmRide,
  onCancelSearch,
  onLocationInputChange,

  pickupValue,
  setPickupValue,

  dropoffValue,
  setDropoffValue,

  fareData,
  searching,
  error,
}) => {
  const [schedule, setSchedule] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("car");

  const contentRef = useRef(null);
  const fareRef = useRef(null);
  const searchingRef = useRef(null);

  const vehicleOptions = [
    { id: "bike", name: "Moto", icon: "🏍️", eta: "2 min", popular: false },
    { id: "auto", name: "Auto", icon: "🛺", eta: "3 min", popular: false },
    { id: "car", name: "QuickGo", icon: "🚗", eta: "2 min", popular: true },
    { id: "xl", name: "Prime XL", icon: "🚙", eta: "4 min", popular: false },
  ];

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

  return (
    <div className="w-full max-w-sm mx-auto bg-slate-900/95 backdrop-blur-2xl text-white rounded-3xl h-[90%] flex flex-col shadow-2xl border border-white/15 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 bg-slate-950/50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white tracking-tight font-display flex items-center gap-2">
            <span>Where to next?</span>
          </h2>
          <p className="text-[11px] font-medium text-slate-400">
            Instant door-to-door dispatch
          </p>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          45+ Drivers Near
        </span>
      </div>

      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700"
      >
        {/* Vehicle Quick Pills */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950/60 rounded-2xl border border-white/10">
          {vehicleOptions.map((v) => {
            const active = selectedCategory === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedCategory(v.id)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all cursor-pointer relative ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-base leading-none mb-1">{v.icon}</span>
                <span className="text-[10px] font-bold leading-tight truncate w-full text-center">{v.name}</span>
                <span className={`text-[9px] font-semibold ${active ? 'text-blue-200' : 'text-slate-500'}`}>{v.eta}</span>
              </button>
            );
          })}
        </div>

        {/* Origin & Destination Inputs with Connector Line */}
        <div className="space-y-3 relative">
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Pickup Point
            </label>
            <InputLocation
              icon={faLocationDot}
              description="Enter pickup address"
              value={pickupValue}
              onValueChange={setPickupValue}
              callback={onPickupSelect}
              onInputChange={onLocationInputChange}
            />
          </div>

          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              Destination Drop
            </label>
            <InputLocation
              icon={faFlagCheckered}
              description="Enter destination address"
              value={dropoffValue}
              onValueChange={setDropoffValue}
              callback={onDropoffSelect}
              onInputChange={onLocationInputChange}
            />
          </div>
        </div>

        <ScheduleInput
          value={schedule}
          onChange={(e) => {
            setSchedule(e.target.value);
            onLocationInputChange();
          }}
        />

        {fareData && <FareSummaryCard ref={fareRef} fareData={fareData} />}

        {searching && (
          <div
            ref={searchingRef}
            className="mt-2"
          >
            <SearchingRider onCancel={onCancelSearch} />
          </div>
        )}
      </div>

      <div className="px-5 py-4 border-t border-white/10 bg-slate-950/70">
        {error && (
          <div className="bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center py-2 px-3 rounded-xl mb-3">
            {error}
          </div>
        )}

        {!fareData ? (
          <button
            onClick={onCheckPrice}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xl shadow-blue-600/30 transition-all duration-200 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <FiZap />
            <span>Calculate Route & Fares</span>
          </button>
        ) : (
          <button
            onClick={onConfirmRide}
            disabled={searching}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:opacity-95 text-white py-3.5 rounded-2xl text-xs sm:text-sm font-black shadow-xl shadow-blue-600/30 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer tracking-wide uppercase"
          >
            {searching ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Broadcasting Dispatch...</span>
              </span>
            ) : (
              "Confirm & Lock Allocation"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default RideRequestPanel;