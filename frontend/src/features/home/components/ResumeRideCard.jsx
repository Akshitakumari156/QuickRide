import React, { useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_API_URL || "";

const ResumeRideCard = ({
  ride,
  onContinueRide,
  onStartNewRide,
}) => {
  const [pickupAddress, setPickupAddress] = useState("Loading pickup...");
  const [destinationAddress, setDestinationAddress] = useState("Loading destination...");

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
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">
            🚖
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Resume Ride Search
            </h2>

            <p className="text-sm text-gray-500">
              You already have an unfinished ride request.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-5">

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
              Pickup
            </p>

            <p className="font-medium text-gray-800 break-words">
              {pickupAddress}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
              Destination
            </p>

            <p className="font-medium text-gray-800 break-words">
              {destinationAddress}
            </p>
          </div>

        </div>

        <button
          onClick={onContinueRide}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
        >
          Continue Searching
        </button>

        <button
          onClick={onStartNewRide}
          className="w-full mt-3 border border-red-500 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-50 transition"
        >
          Start New Ride
        </button>

      </div>
    </div>
  );
};

export default ResumeRideCard;