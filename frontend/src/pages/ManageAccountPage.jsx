import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updatePassword, deleteAccount } from '../api/userService';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Lock, ShieldAlert, X } from 'lucide-react';

const ManageAccountPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await updatePassword({ currentPassword, newPassword });
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update password' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await deleteAccount();
      logout();
      navigate('/login');
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to delete account' });
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-lg w-full space-y-6">
        
        {/* Update Password Section */}
        <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/15 overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="p-2.5 bg-blue-500/15 border border-blue-500/30 rounded-xl text-blue-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white font-display">Security & Password</h2>
                <p className="text-xs text-slate-400">Keep your account secure with updated credentials</p>
              </div>
            </div>
            
            {message.text && (
              <div className={`p-4 mb-6 rounded-2xl text-xs font-semibold border ${message.type === 'success' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/15 text-rose-300 border-rose-500/30'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full bg-slate-950/60 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full bg-slate-950/60 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
              >
                {loading ? 'Updating Password...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-rose-500/30 overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-rose-400 font-display">Danger Zone</h2>
                <p className="text-xs text-slate-400">Irreversible account purge</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs my-4 leading-relaxed">
              Once you delete your account, there is no going back. All your personal data and booking archives will be permanently erased.
            </p>
            
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 font-bold py-3 px-4 rounded-2xl text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
            >
              Permanently Delete Account
            </button>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowDeleteModal(false)} />
          <div className="bg-slate-900 border border-white/20 rounded-3xl w-full max-w-md p-6 relative z-10 shadow-2xl animate-[toast-in_0.2s_ease-out]">
            <button 
              onClick={() => setShowDeleteModal(false)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mb-4 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-black text-white font-display mb-2">Delete Account Confirmation</h3>
            <p className="text-slate-400 text-xs mb-6 leading-relaxed">
              Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently wipe your profile, payment methods, and ride history.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-white/10 hover:bg-white/15 text-slate-300 font-bold py-3 px-4 rounded-2xl text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-4 rounded-2xl text-xs transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer shadow-lg shadow-rose-600/30"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAccountPage;
