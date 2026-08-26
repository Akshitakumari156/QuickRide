import React, { useState, useEffect } from 'react';
import { getRideHistory } from '../api/userService';
import { FiMapPin as MapPinIcon, FiClock as ClockIcon, FiDollarSign as DollarIcon } from 'react-icons/fi';
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Ride History</h2>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-black"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center shadow-sm">
            {error}
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No rides yet</h3>
            <p className="text-gray-500">You haven't taken any rides with QuickRide.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((ride) => (
              <div key={ride._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md hover:border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1.5 flex items-center gap-1.5">
                        <ClockIcon className="w-4 h-4" />
                        {formatDate(ride.createdAt)}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                        ${ride.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                          ride.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'}`}>
                        {ride.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-gray-900">₹{ride.fare}</p>
                      <p className="text-sm font-medium text-gray-500">{ride.distanceKm?.toFixed(1)} km</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-1.5 bg-blue-50 rounded-full">
                        <MapPin className="text-blue-600 w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 mb-0.5 uppercase tracking-wider">Pickup</p>
                        <p className="text-sm font-medium text-gray-800">{ride.pickup?.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-1.5 bg-green-50 rounded-full">
                        <Navigation className="text-green-600 w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 mb-0.5 uppercase tracking-wider">Dropoff</p>
                        <p className="text-sm font-medium text-gray-800">{ride.destination?.address}</p>
                      </div>
                    </div>
                  </div>

                  {ride.captainId && (
                    <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between bg-gray-50 -mx-6 -mb-6 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold">
                          {ride.captainId.firstname?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {ride.captainId.firstname} {ride.captainId.lastname}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            {ride.captainId.vehicle?.plate || 'Captain'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RideHistoryPage;
