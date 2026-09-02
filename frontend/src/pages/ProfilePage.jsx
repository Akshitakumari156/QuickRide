import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../api/userService';
import { User, Mail, ShieldCheck } from 'lucide-react';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname || '');
      setLastname(user.lastname || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await updateProfile({ firstname, lastname });
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        if (setUser) {
          setUser({ ...user, firstname: response.data.user.firstname, lastname: response.data.user.lastname });
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-lg w-full bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/15 overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/30 border border-white/20">
              {firstname ? firstname.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h2 className="text-xl font-black text-white font-display">Personal Identity</h2>
              <p className="text-xs text-slate-400 font-medium">Manage your verified rider account credentials</p>
            </div>
          </div>
          
          {message.text && (
            <div className={`p-4 mb-6 rounded-2xl text-xs font-semibold border ${message.type === 'success' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/15 text-rose-300 border-rose-500/30'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  className="w-full bg-slate-950/60 border border-white/15 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  className="w-full bg-slate-950/60 border border-white/15 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full bg-slate-950/40 border border-white/5 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-400 cursor-not-allowed outline-none"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500 font-medium">Verified email cannot be modified directly.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
            >
              {loading ? 'Saving Changes...' : 'Update Profile Details'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
