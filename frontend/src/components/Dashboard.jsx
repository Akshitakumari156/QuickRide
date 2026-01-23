import CaptainMap from "./CaptainMap";
import AvailabilityCard from "./AvailabilityCard";
import useCaptainLocation from "../hooks/useCaptainLocation";
import StatsCard from "./Statscard";

const Dashboard = ({ isOnline, setIsOnline }) => {
const captainId = "123"; // 🔴 from auth / JWT in real app
 const { coords, address } = useCaptainLocation(captainId);

  const stats = [
    { label: "Total Earnings", value: "₹12,450" },
    { label: "Rides Accepted", value: "128" },
    { label: "Rides Rejected", value: "12" },
    { label: "Online Hours", value: "74h" },
  ];

  return (
    <>
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-1">
        Dashboard Overview
      </h1>

      {/* 📍 CURRENT LOCATION TEXT */}
      <p className="text-gray-600 mb-6">
        📍 Current Location:{" "}
        <span className="font-medium text-gray-800">
          {address}
        </span>
      </p>

      {/* TOP STATS + AVAILABILITY */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {stats.map((item, i) => (
          <StatsCard key={i} {...item} />
        ))}

        <AvailabilityCard
          isOnline={isOnline}
          setIsOnline={setIsOnline}
        />
      </div>

      {/* 🗺️ MAP */}
      <div className="bg-white rounded-2xl shadow p-4 h-[400px] mb-8">
        <CaptainMap coords={coords} />
      </div>

      {/* PERFORMANCE CARD */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-2">
          Performance
        </h3>
        <p className="text-gray-500">
          You are performing better than 82% of captains in
          your city.
        </p>
      </div>
    </>
  );
};

export default Dashboard;
