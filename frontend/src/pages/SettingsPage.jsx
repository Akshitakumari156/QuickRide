import React, { useState } from 'react';
import { Bell, Moon, Sparkles } from 'lucide-react';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <div className="min-h-screen bg-[#060a12] text-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-lg w-full bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/15 overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="mb-8 pb-4 border-b border-white/10">
            <h2 className="text-2xl font-black text-white font-display">System & Preferences</h2>
            <p className="text-xs text-slate-400 mt-1">Configure client alerts, telemetry feeds, and display parameters</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 bg-blue-500/15 text-blue-400 rounded-xl border border-blue-500/30">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Push Telemetry Notifications</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time alerts for captain arrivals & fare drops</p>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors cursor-pointer ${notifications ? 'bg-blue-600' : 'bg-slate-800'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 bg-purple-500/15 text-purple-400 rounded-xl border border-purple-500/30">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Ultra-Dark Theme</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Glassmorphism dark mobility interface</p>
                </div>
              </div>
              <button 
                onClick={() => setDarkTheme(!darkTheme)}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors cursor-pointer ${darkTheme ? 'bg-purple-600' : 'bg-slate-800'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkTheme ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>QuickRide v2.4.0 High-Performance</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" /> Core Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
