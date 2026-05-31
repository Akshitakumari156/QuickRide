import { useState } from "react";
import HomeSidebar from "./HomeSidebar";
import MapView from "./MapView";

const PrivateHome = () => {
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [fare, setFare] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckPrice = async (schedule) => {
    if (!pickup || !dropoff) {
      console.warn("Pickup or dropoff missing");
      setError("Please select both pickup and dropoff locations");
      return;
    }
    setError(null);

    console.log({ pickup, dropoff, schedule });

    try {
      const resp = await fetch(
        `http://localhost:5000/api/route/fare?` +
        `srcLat=${pickup.lat}&srcLng=${pickup.lng}` +
        `&dstLat=${dropoff.lat}&dstLng=${dropoff.lng}`
      );
      const data = await resp.json();
      console.log("fare data:", data);
      setFare(data);
    } catch (err) {
      console.error("Failed to fetch fare estimation:", err);
      setError("Error calculating price. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-gray-50">
      <div className="flex-1 overflow-hidden pt-4">
        <div className="flex h-full gap-4 px-4 md:px-6 pb-4">

          {/* SIDEBAR CONTAINER */}
          <div className="hidden md:flex w-[380px] h-full flex-shrink-0">
            <HomeSidebar
              onPickupSelect={setPickup}
              onDropoffSelect={setDropoff}
              onCheckPrice={handleCheckPrice}
              fareData={fare}
              setFareData={setFare} // 🚀 CRITICAL FIX: Passing down the state modifier
              pickupCoords={pickup}
              error={error}
            />
          </div>

          {/* MAP */}
          <div className="flex-1 h-full min-h-0 relative overflow-hidden rounded-2xl border border-slate-200 shadow-md">
            <MapView pickup={pickup} dropoff={dropoff} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivateHome;