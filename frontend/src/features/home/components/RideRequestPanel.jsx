import React, { useEffect, useRef, useState } from "react";
import InputLocation from "../../ride/InputLocation";
import SearchingRider from "../../ride/SearchingRider";
import ScheduleInput from "../ScheduleInput";
import FareSummaryCard from "../FareSummaryCard";
import { faLocationDot, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";

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

  const contentRef = useRef(null);
  const fareRef = useRef(null);
  const searchingRef = useRef(null);

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
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl h-[90%] flex flex-col shadow-xl border border-slate-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 bg-white">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Request a ride
        </h2>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          Choose pickup and destination
        </p>
      </div>

      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto px-6 py-5 space-y-5 scrollbar-thin scrollbar-thumb-slate-200"
      >
        <div className="space-y-3">
          <InputLocation
    icon={faLocationDot}
    description="Pickup location"
    value={pickupValue}
    onValueChange={setPickupValue}
    callback={onPickupSelect}
    onInputChange={onLocationInputChange}
/>
         <InputLocation
    icon={faFlagCheckered}
    description="Drop-off location"
    value={dropoffValue}
    onValueChange={setDropoffValue}
    callback={onDropoffSelect}
    onInputChange={onLocationInputChange}
/>
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
            className="mt-2 border border-slate-100 rounded-xl overflow-hidden shadow-inner"
          >
            <SearchingRider onCancel={onCancelSearch} />
          </div>
        )}
      </div>

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
            onClick={onConfirmRide}
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

export default RideRequestPanel;