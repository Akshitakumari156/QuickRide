import React from "react";
import { FiGrid, FiClock, FiStar, FiUser, FiLogOut, FiNavigation } from "react-icons/fi";

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menu = [
    { id: "dashboard", label: "Driver Console", icon: <FiGrid /> },
    { id: "history", label: "Trip History", icon: <FiClock /> },
    { id: "reviews", label: "Passenger Reviews", icon: <FiStar /> },
    { id: "profile", label: "Profile & Fleet", icon: <FiUser /> },
  ];

  return (
    <aside className="w-72 bg-[#060a12] text-white flex flex-col p-6 border-r border-white/10 shrink-0 select-none">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 border border-white/20">
          <FiNavigation className="text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-black tracking-tight text-white font-display">
            Quick<span className="text-emerald-400">Captain</span>
          </h2>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Partner Portal
          </span>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 text-left px-4 py-3 rounded-2xl font-bold text-xs tracking-wide transition-all cursor-pointer ${
                active
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20 border border-white/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className={`text-base ${active ? 'text-white' : 'text-slate-400'}`}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto flex items-center justify-center gap-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 font-bold px-4 py-3 rounded-2xl transition-all text-xs tracking-wider uppercase cursor-pointer"
      >
        <FiLogOut />
        <span>End Session (Logout)</span>
      </button>
    </aside>
  );
};

export default Sidebar;
