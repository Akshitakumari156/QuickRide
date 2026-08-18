import React, { useEffect, useState } from "react";

const RideHistory = ({ userType = "passenger" }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = userType === "captain" ? localStorage.getItem("captainToken") : localStorage.getItem("token");
        const endpoint = userType === "captain" ? "/api/ride/captain/history" : "/api/ride/history";
        
        const res = await fetch(`${import.meta.env.VITE_API_URL || ""}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (data.success && data.history) {
          setHistory(data.history);
        }
      } catch (err) {
        console.error("Error fetching ride history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userType]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "COMPLETED": return "text-green-600";
      case "CANCELLED": return "text-red-500";
      case "ONGOING": return "text-blue-500";
      case "ACCEPTED": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Ride History</h2>

      {loading ? (
        <p className="text-gray-500">Loading history...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500">No rides found in your history.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Date</th>
                <th>From</th>
                <th>To</th>
                <th>Fare</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((ride, idx) => (
                <tr key={ride._id || idx} className="border-b last:border-b-0">
                  <td className="py-3">
                    {formatDate(ride.createdAt)}
                  </td>
                  <td className="pr-4">{ride.pickup?.address || ride.pickup?.text || "Unknown"}</td>
                  <td className="pr-4">{ride.destination?.address || ride.destination?.text || "Unknown"}</td>
                  <td>₹{ride.fare || 0}</td>
                  <td className={`font-medium ${getStatusColor(ride.status)}`}>
                    {ride.status || "UNKNOWN"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RideHistory;
