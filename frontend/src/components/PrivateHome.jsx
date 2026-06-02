// components/PrivateHome.jsx
import { useState, useEffect } from "react";
import HomeSidebar from "./HomeSidebar";
import MapView from "./MapView";
import DriverArriving from "./DriverArrivingCard"; 
import socket from "../socket/socket"; 

const PrivateHome = () => {
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [fare, setFare] = useState(null);
  const [error, setError] = useState(null);
  const [activeRide, setActiveRide] = useState(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleRideAccepted = (payload) => {
      console.log("🎉 Ride dual-lock allocation claimed by captain successfully:", payload.ride);
      setActiveRide(payload.ride);
    };

    socket.on("ride:accepted", handleRideAccepted);

    return () => {
      socket.off("ride:accepted", handleRideAccepted);
    };
  }, []);

  const handleCheckPrice = async (schedule) => {
    if (!pickup || !dropoff) {
      setError("Please select both pickup and dropoff locations");
      return;
    }
    setError(null);

    try {
      const resp = await fetch(
        `http://localhost:5000/api/route/fare?` +
        `srcLat=${pickup.lat}&srcLng=${pickup.lng}` +
        `&dstLat=${dropoff.lat}&dstLng=${dropoff.lng}`
      );
      const data = await resp.json();
      setFare(data);
    } catch (err) {
      console.error("Failed to fetch fare estimation:", err);
      setError("Error calculating price. Please try again.");
    }
  };

  const handleCancelActiveRide = () => {
    if (window.confirm("Are you sure you want to cancel this ride request?")) {
      setActiveRide(null);
      setFare(null);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-gray-50">
      <div className="flex-1 overflow-hidden pt-4">
        <div className="flex flex-col md:flex-row h-full gap-4 px-4 md:px-6 pb-4 relative">

          {/* RESPONSIVE PANEL OVERLAY BLOCK */}
          <div className="w-full md:w-[380px] h-auto md:h-full flex-shrink-0 absolute bottom-4 left-0 right-0 px-4 md:static md:px-0 z-50 pointer-events-none">
            <div className="w-full h-full pointer-events-auto bg-white md:bg-transparent rounded-2xl shadow-xl md:shadow-none">
              {!activeRide ? (
                <HomeSidebar
                  onPickupSelect={setPickup}
                  onDropoffSelect={setDropoff}
                  onCheckPrice={handleCheckPrice}
                  fareData={fare}
                  setFareData={setFare}
                  pickupCoords={pickup}   
                  dropoffCoords={dropoff} 
                  error={error}
                />
              ) : (
                <DriverArriving 
                  activeRide={activeRide} 
                  onCancelRide={handleCancelActiveRide}
                />
              )}
            </div>
          </div>

          {/* MAP CANVAS GRID */}
          <div className="flex-1 h-full min-h-0 relative overflow-hidden rounded-2xl border border-slate-200 shadow-md z-10">
            <MapView pickup={pickup} dropoff={dropoff} activeRide={activeRide} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivateHome;