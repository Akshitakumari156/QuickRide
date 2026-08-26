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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-md w-full space-y-8">
        
        {/* Update Password Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Lock className="w-5 h-5 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Security</h2>
            </div>
            
            {message.text && message.type !== 'error' && (
              <div className="p-4 mb-6 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200">
                {message.text}
              </div>
            )}
            {message.text && message.type === 'error' && (
              <div className="p-4 mb-6 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
                {message.text}
              </div>
            )}

            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-50 rounded-lg">
                <ShieldAlert className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
            </div>
            <p className="text-gray-500 text-sm mb-6 pl-12">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-200 font-medium py-3 px-4 rounded-xl transition-colors duration-300"
            >
              Delete Account
            </button>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowDeleteModal(false)}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently delete your profile, ride history, and personal data.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-medium py-2.5 px-4 rounded-xl transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
