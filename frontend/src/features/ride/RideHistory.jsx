import React, { useEffect, useState } from "react";
import { FiClock, FiMapPin, FiNavigation, FiFilter, FiSearch, FiFileText, FiCheckCircle, FiX } from "react-icons/fi";

const RideHistory = ({ userType = "passenger" }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);

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

  const getStatusBadge = (status) => {
    switch(status) {
      case "COMPLETED": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "CANCELLED": return "bg-rose-500/15 text-rose-400 border-rose-500/30";
      case "ONGOING": return "bg-purple-500/15 text-purple-400 border-purple-500/30";
      case "ACCEPTED": return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      default: return "bg-slate-500/15 text-slate-400 border-slate-500/30";
    }
  };

  const filteredHistory = history.filter((ride) => {
    const matchesFilter = filter === "ALL" || ride.status === filter;
    const pickupStr = (typeof ride.pickup === 'string' ? ride.pickup : ride.pickup?.address || '').toLowerCase();
    const destStr = (typeof ride.destination === 'string' ? ride.destination : ride.destination?.address || '').toLowerCase();
    const matchesSearch = pickupStr.includes(searchQuery.toLowerCase()) || destStr.includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalSpentOrEarned = history
    .filter(r => r.status === "COMPLETED")
    .reduce((acc, curr) => acc + (Number(curr.fare) || 0), 0);

  return (
    <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <h2 className="text-xl font-black text-white font-display">Trip Archive & Records</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Comprehensive audit logs with receipt generation</p>
        </div>

        {/* Summary metric banner */}
        <div className="flex items-center gap-3 bg-slate-950/70 border border-white/10 px-4 py-2 rounded-2xl">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{userType === "captain" ? "Total Earnings" : "Total Spent"}</p>
            <p className="text-sm font-black text-emerald-400 font-display">₹{totalSpentOrEarned.toLocaleString()}</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Trips</p>
            <p className="text-sm font-black text-white font-display">{history.length}</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 border border-white/10 rounded-2xl w-full sm:w-auto">
          {["ALL", "COMPLETED", "CANCELLED"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === tab
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "ALL" ? "All Rides" : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search address or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-white/10 rounded-2xl pl-9 pr-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-16 text-slate-500 text-xs">
          No trip records found matching your filters.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 border-b border-white/10 uppercase tracking-wider font-bold text-[10px]">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Pickup Address</th>
                <th className="py-3 px-3">Destination Address</th>
                <th className="py-3 px-3">Fare</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredHistory.map((ride, idx) => (
                <tr key={ride._id || idx} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => setSelectedRide(ride)}>
                  <td className="py-3.5 px-3 font-semibold text-slate-300 whitespace-nowrap">
                    {formatDate(ride.createdAt)}
                  </td>
                  <td className="py-3.5 px-3 text-slate-200 font-medium max-w-[180px] truncate">
                    {typeof ride.pickup === 'string' ? ride.pickup : ride.pickup?.address || "Pickup Point"}
                  </td>
                  <td className="py-3.5 px-3 text-slate-200 font-medium max-w-[180px] truncate">
                    {typeof ride.destination === 'string' ? ride.destination : ride.destination?.address || "Destination Target"}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-emerald-400 font-display">
                    ₹{ride.fare || 0}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusBadge(ride.status)}`}>
                      {ride.status || "UNKNOWN"}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRide(ride);
                      }}
                      className="text-blue-400 hover:text-blue-300 font-bold p-1.5 hover:bg-blue-600/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiFileText className="text-sm" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Interactive Trip Receipt Modal */}
      {selectedRide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-6 max-w-md w-full shadow-2xl relative text-white animate-[toast-in_0.2s_ease-out]">
            <button
              onClick={() => setSelectedRide(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 cursor-pointer"
            >
              <FiX />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-lg">
                <FiFileText />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white font-display">Ride Tax Receipt</h3>
                <p className="text-xs text-slate-400">{formatDate(selectedRide.createdAt)}</p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 space-y-3 text-xs mb-5">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pickup</p>
                <p className="text-slate-200 font-semibold">{typeof selectedRide.pickup === 'string' ? selectedRide.pickup : selectedRide.pickup?.address || 'Pickup Point'}</p>
              </div>
              <div className="border-t border-white/5 pt-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Destination</p>
                <p className="text-slate-200 font-semibold">{typeof selectedRide.destination === 'string' ? selectedRide.destination : selectedRide.destination?.address || 'Destination'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-3 border-t border-white/10 mb-6">
              <span className="font-bold text-slate-300">Total Charged</span>
              <span className="text-2xl font-black text-emerald-400 font-display">₹{selectedRide.fare}</span>
            </div>

            <button
              onClick={() => setSelectedRide(null)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-2xl text-xs transition-colors cursor-pointer"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideHistory;
