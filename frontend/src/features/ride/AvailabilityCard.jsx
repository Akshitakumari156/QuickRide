const AvailabilityCard = ({ isOnline, setIsOnline }) => (
  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-between text-center shadow-xl relative overflow-hidden group">
    <div className="flex items-center justify-between w-full mb-2">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</p>
      <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse' : 'bg-rose-400'}`} />
    </div>

    <span
      className={`my-2 px-3 py-1 rounded-full text-[11px] font-black tracking-widest uppercase border ${
        isOnline
          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
          : "bg-rose-500/15 text-rose-400 border-rose-500/30"
      }`}
    >
      {isOnline ? "Broadcasting Online" : "Currently Offline"}
    </span>

    <button
      onClick={() => setIsOnline((prev) => !prev)}
      className={`w-full mt-2 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.98] ${
        isOnline
          ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30"
          : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30"
      }`}
    >
      Switch {isOnline ? "Offline" : "Online"}
    </button>
  </div>
);

export default AvailabilityCard;
