import React, { useState, useEffect } from 'react';
import { getRideHistory } from '../api/userService';
import { FiClock as ClockIcon } from 'react-icons/fi';
import { MapPin, Navigation } from 'lucide-react';

const RideHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getRideHistory();
        if (response.data.success) {
          setHistory(response.data.history);
        }
      } catch (err) {
        setError('Failed to fetch ride history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "COMPLETED": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "CANCELLED": return "bg-rose-500/15 text-rose-400 border-rose-500/30";
      default: return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 pb-4 border-b border-white/10">
          <h2 className="text-3xl font-black text-white font-display">Your Ride History</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Review your past trips, receipts, and captain ratings</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500/30 border-t-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-rose-500/20 border border-rose-500/30 text-rose-300 p-4 rounded-2xl text-center text-xs font-semibold">
            {error}
          </div>
        ) : history.length === 0 ? (
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
            <h3 className="text-lg font-bold text-white font-display mb-1">No recorded rides yet</h3>
            <p className="text-xs text-slate-400">You haven't requested any rides with QuickRide yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((ride) => (
              <div key={ride._id} className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden transition-all hover:border-white/20 p-6">
                <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-1.5 flex items-center gap-1.5">
                      <ClockIcon className="w-3.5 h-3.5 text-blue-400" />
                      {formatDate(ride.createdAt)}
                    </p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusBadge(ride.status)}`}>
                      {ride.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-emerald-400 font-display">₹{ride.fare}</p>
                    <p className="text-xs font-semibold text-slate-400">{ride.distanceKm?.toFixed(1)} km</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 bg-blue-500/15 rounded-full text-blue-400">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pickup</p>
                      <p className="font-semibold text-slate-200">{ride.pickup?.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 bg-emerald-500/15 rounded-full text-emerald-400">
                      <Navigation className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dropoff</p>
                      <p className="font-semibold text-slate-200">{ride.destination?.address}</p>
                    </div>
                  </div>
                </div>

                {ride.captainId && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                        {ride.captainId.firstname?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">
                          {ride.captainId.firstname} {ride.captainId.lastname}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {ride.captainId.vehicle?.plate || 'Verified Driver'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RideHistoryPage;
