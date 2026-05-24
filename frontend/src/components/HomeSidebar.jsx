import React, { useState, useRef, useEffect } from "react";
import InputLocation from "./InputLocation";
import SearchingRider from "./SearchingRider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faFlagCheckered,
  faClock,
  faRoute,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

const HomeSidebar = ({
  onPickupSelect,
  onDropoffSelect,
  onCheckPrice,
  fareData,
  pickupCoords,
  error,
}) => {
  const [schedule, setSchedule] = useState("");
  const [searching, setSearching] = useState(false);

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

  const handleConfirmRide = async () => {
    console.log("Confirm Ride clicked");

    if (!pickupCoords || !fareData) {
      console.warn("Missing pickup or fare data");
      return;
    }

    try {
      setSearching(true);

      const res = await fetch(
        "http://localhost:5000/api/ride/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pickup: pickupCoords,
            vehicleType: "car",
            schedule: schedule || null,
          }),
        }
      );

      const data = await res.json();

      console.log("Ride requested successfully:", data);
    } catch (err) {
      console.error("Ride request failed:", err);
      setSearching(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[80%] w-full bg-white rounded-xl flex flex-col">
        {/* HEADER */}
        <div className="px-6 pt-6 pb-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">
            Request a ride
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Choose pickup and destination
          </p>
        </div>

        {/* CONTENT */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
        >
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
          <div className="px-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule ride (optional)
            </label>

            <div className="relative">
              <FontAwesomeIcon
                icon={faClock}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="datetime-local"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Fare Card */}
          {fareData && (
            <div
              ref={fareRef}
              className="rounded-2xl border bg-gradient-to-br from-gray-50 to-gray-100 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Estimated Fare
                </h3>

                <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
                  Best Price
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faRoute} />
                  <span>{fareData.distanceKm} km</span>
                </div>

                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} />
                  <span>{fareData.durationMin} min</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Total Payable
                </div>

                <div className="text-3xl font-bold text-black flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faIndianRupeeSign}
                    className="text-xl"
                  />
                  {fareData.fare}
                </div>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Inclusive of base fare & distance charges
              </p>
            </div>
          )}

          {/* Searching Rider */}
          {searching && (
            <div
              ref={searchingRef}
              className="mt-2"
            >
              <SearchingRider
                onCancel={() => setSearching(false)}
              />
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t bg-white">
          {error && (
            <p className="text-red-500 text-sm text-center mb-3 font-medium">
              {error}
            </p>
          )}

          {!fareData ? (
            <button
              onClick={onCheckPrice}
              className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
            >
              Check Price
            </button>
          ) : (
            <button
              onClick={handleConfirmRide}
              disabled={searching}
              className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-900 transition disabled:bg-gray-400"
            >
              {searching ? "Searching..." : "Search Rider"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;