import React from "react";
import { FiUser, FiTruck } from "react-icons/fi";

const ProfileSettings = () => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 md:p-8 max-w-2xl shadow-2xl">
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-black text-white font-display">Driver & Vehicle Credentials</h2>
        <p className="text-xs text-slate-400 font-medium mt-0.5">Manage your driver identity and registered fleet telemetry</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Captain Full Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Captain Full Name"
              defaultValue="QuickRide Partner"
              className="w-full bg-slate-950/60 border border-white/15 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Registered Vehicle License Plate
          </label>
          <div className="relative">
            <FiTruck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Vehicle License Plate (e.g. DL 01 AB 1234)"
              defaultValue="DL 01 AB 1234"
              className="w-full bg-slate-950/60 border border-white/15 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 uppercase"
            />
          </div>
        </div>

        <div className="pt-3">
          <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all cursor-pointer active:scale-[0.98]">
            Save Profile Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
