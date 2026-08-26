import React, { useState } from 'react';
import { Bell, Moon } from 'lucide-react';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">App Settings</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Push Notifications</h3>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">Receive updates about your rides</p>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-black' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Dark Mode</h3>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">Toggle app appearance</p>
                </div>
              </div>
              <button 
                onClick={() => setDarkTheme(!darkTheme)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkTheme ? 'bg-black' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkTheme ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-400 text-center">
              QuickRide App Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
