import React, { useState } from "react";
import InputLocation from "./InputLocation";
import {
  faLocationDot,
  faFlagCheckered,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const HomeSidebar = ({
  onPickupSelect,
  onDropoffSelect,
  onCheckPrice,
}) => {
  const [schedule, setSchedule] = useState("");

  return (
    <div className="h-full w-full bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-900">
          Request a ride
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter pickup and destination
        </p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Pickup */}
        <InputLocation
          icon={faLocationDot}
          description="Pickup location"
          callback={onPickupSelect}
        />

        {/* Dropoff */}
        <InputLocation
          icon={faFlagCheckered}
          description="Drop-off location"
          callback={onDropoffSelect}
        />

        {/* Schedule */}
        <div className="px-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Schedule ride (optional)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <i className="fa-solid fa-clock" />
            </span>
            <input
              type="datetime-local"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t bg-white">
        <button
          onClick={() => onCheckPrice(schedule)}
          className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
        >
          Check price
        </button>
      </div>
    </div>
  );
};

export default HomeSidebar;
