import React from "react";

const LocationForm = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Enter Ride Details
      </h2>

      {/* Pickup */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Pickup Location
        </label>
        <input
          type="text"
          placeholder="Enter pickup location"
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Destination */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Drop Location
        </label>
        <input
          type="text"
          placeholder="Enter destination"
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Button */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
        Find Ride
      </button>
    </div>
  );
};

export default LocationForm;
