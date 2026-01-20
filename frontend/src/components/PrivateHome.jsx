import React, { useState } from "react";
import HomeSidebar from "./HomeSidebar";
import MapView from "./MapView";

const PrivateHome = () => {
    const [pickup, setPickup] = useState(null);
    const [dropoff, setDropoff] = useState(null);
    const[fare,setFare]=useState(null);
    const handleCheckPrice = async(schedule) => {
        console.log({ pickup, dropoff, schedule });
            const resp = await fetch(
      `http://localhost:5000/api/route/fare?` +
        `srcLat=${pickup.lat}&srcLon=${pickup.lon}` +
        `&dstLat=${dropoff.lat}&dstLon=${dropoff.lon}`
    );
     const data = await resp.json();
     console.log("fare data:", data);
    setFare(data);

    };

    return (
        <div className="w-full h-full flex flex-col overflow-hidden bg-gray-100">
            {/* MAIN CONTENT */}
            <div className="flex-1 overflow-hidden">
                <div className="flex h-full gap-4 px-4 md:px-6 pb-4">

                    {/* SIDEBAR (FIXED WIDTH, NO COLLAPSE) */}
                    <div className="hidden md:flex w-[380px] h-full bg-white rounded-xl border shadow flex-col flex-shrink-0">
                        <div className="px-4 py-3 border-b shrink-0">
                            <h2 className="font-semibold text-gray-800">
                                Book a ride
                            </h2>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <HomeSidebar
                                onPickupSelect={setPickup}
                                onDropoffSelect={setDropoff}
                                onCheckPrice={handleCheckPrice}
                                fareData={fare}
                            />
                        </div>
                    </div>

                    {/* MAP */}
                    <div className="flex-1 relative overflow-hidden rounded-xl border shadow">
                        <MapView pickup={pickup} dropoff={dropoff} />

                        {/* Bottom action */}
                        {pickup && dropoff && (
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
                                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md font-medium">
                                    Confirm Ride
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PrivateHome;
