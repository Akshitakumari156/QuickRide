import React, { useState } from "react";
import InputLocation from "./InputLocation";
import { faLocationDot, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";

const LocationForm = ({ onCheckPrice }) => {
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [error, setError] = useState("");

  // Handles caching/reset logic when user types a new query
  const handleLocationInputChange = () => {
    setError("");
  };

  const handlePickupSelect = (locationData) => {
    setPickupCoords(locationData);
  };

  const handleDropoffSelect = (locationData) => {
    setDropoffCoords(locationData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!pickupCoords || !dropoffCoords) {
      setError("Please select both a valid pickup and drop location from the suggestions.");
      return;
    }

    // Pass the coordinate state back up to your dashboard matching handler
    if (onCheckPrice) {
      onCheckPrice({ pickupCoords, dropoffCoords });
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-6 space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Enter Ride Details
        </h2>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          Select locations to calculate exact fare pricing
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pickup Search Component Integration */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 pl-4">
            Pickup Location
          </label>
          <InputLocation
            icon={faLocationDot}
            description="Where are we picking you up?"
            callback={handlePickupSelect}
            onInputChange={handleLocationInputChange}
          />
        </div>

        {/* Dropoff Search Component Integration */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 pl-4">
            Drop Location
          </label>
          <InputLocation
            icon={faFlagCheckered}
            description="Where are you heading?"
            callback={handleDropoffSelect}
            onInputChange={handleLocationInputChange}
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-semibold text-center py-2 px-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-900 to-indigo-600 text-white py-3.5 rounded-xl text-base font-bold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform active:scale-[0.99]"
        >
          Find Ride
        </button>
      </form>
    </div>
  );
};

export default LocationForm;