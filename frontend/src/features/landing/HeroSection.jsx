import banner from "../../assets/homepagebanner.jpg"
import RideLocationForm from "../ride/RideLocationForm"
import { FiShield, FiTrendingUp, FiZap, FiActivity, FiCheckCircle, FiStar, FiMapPin } from "react-icons/fi"

const HeroSection = () => {
  return (
    <section className="relative w-full bg-[#060a12] text-white overflow-hidden pt-8 pb-20 md:pt-12 md:pb-28">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 -left-40 w-[550px] h-[550px] rounded-full bg-blue-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* Live Network Ticker Bar */}
        <div className="mb-6 inline-flex flex-wrap items-center gap-3 p-1.5 pr-4 rounded-full bg-slate-900/90 border border-white/10 backdrop-blur-md shadow-lg text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/20 uppercase text-[10px] tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Network
          </span>
          <span className="text-slate-400 hidden sm:inline">⚡ Avg arrival: <strong className="text-white">2.8 mins</strong></span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden md:inline">🔥 12,400+ rides matched today</span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="text-blue-400 font-medium">Verified 0% Surge Zone</span>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
          
          {/* Left Column: Heading + Form + Proof */}
          <div className="w-full lg:w-[54%]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black leading-[1.05] tracking-tight font-display text-white">
              Next-Gen Mobility. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">Doorstep in Minutes.</span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-slate-300 max-w-xl leading-relaxed font-medium">
              Intelligent driver dispatch, dual-concurrency matching, verified captains, and upfront locked pricing.
            </p>

            {/* Ride Request Form Glass Container */}
            <div className="mt-8 bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/15 p-5 md:p-7 shadow-2xl shadow-black/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3 relative z-10">
                <span className="text-xs font-bold tracking-widest text-slate-300 uppercase font-display flex items-center gap-2">
                  <FiZap className="text-blue-400 text-sm" /> Instant Route Dispatch
                </span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 rounded-full">
                  GPS Active
                </span>
              </div>
              <RideLocationForm />
            </div>

            {/* Metrics */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-3.5">
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">2.8M+</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">Completed Trips</p>
              </div>
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-3.5">
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display text-blue-400">65K+</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">Partner Captains</p>
              </div>
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-3.5">
                <p className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight font-display">4.9★</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">Top Tier Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual */}
          <div className="w-full lg:w-[46%] relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/80 group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-transparent to-transparent z-10 opacity-80" />
              <img
                src={banner}
                alt="QuickRide urban transport"
                className="w-full h-[480px] lg:h-[560px] object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Top Badge */}
              <div className="absolute top-5 left-5 z-20 bg-slate-900/90 backdrop-blur-xl border border-white/15 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white">Live In-Cab Telemetry</span>
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-5 left-5 right-5 z-20 bg-slate-900/95 backdrop-blur-2xl border border-white/15 p-4 rounded-2xl shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl">
                    <FiShield />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight">100% Certified Drivers</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Government ID, Background & Plate Verified</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-1 rounded-full">
                  Verified
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
