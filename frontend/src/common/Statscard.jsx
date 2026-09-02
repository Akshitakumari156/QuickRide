const StatsCard = ({ label, value }) => (
  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center shadow-xl flex flex-col justify-between hover:border-white/20 transition-all">
    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
    <h3 className="text-2xl font-black mt-2 text-white font-display tracking-tight">{value}</h3>
  </div>
);

export default StatsCard;
