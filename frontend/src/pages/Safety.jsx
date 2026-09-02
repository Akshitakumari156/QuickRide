import { FiShield, FiMapPin, FiPhoneCall, FiUserCheck, FiAlertTriangle, FiLock, FiCheckCircle } from "react-icons/fi"

const pillars = [
  {
    icon: <FiUserCheck />,
    title: "100% Verified Captains",
    desc: "Rigorous background checks, official driving record verification, and in-person document screening.",
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-400",
  },
  {
    icon: <FiLock />,
    title: "Secure 4-Digit OTP",
    desc: "Rides can only begin once the captain inputs your unique secret OTP generated on booking.",
    color: "from-emerald-500/20 to-teal-600/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: <FiMapPin />,
    title: "Continuous GPS Telemetry",
    desc: "Real-time satellite tracking monitors route progress with live shareable links for family and friends.",
    color: "from-purple-500/20 to-indigo-600/10",
    iconColor: "text-purple-400",
  },
  {
    icon: <FiAlertTriangle />,
    title: "Intelligent Route Guard",
    desc: "Automated telemetry flags unexpected deviations, extended stops, or unauthorized lane exits.",
    color: "from-amber-500/20 to-orange-600/10",
    iconColor: "text-amber-400",
  },
]

const Safety = () => {
  return (
    <div className="w-full min-h-screen bg-[#090d16] text-white">
      {/* Hero Banner */}
      <div className="relative py-16 md:py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center relative z-10">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 text-2xl mb-6 shadow-lg shadow-blue-500/20">
            <FiShield />
          </span>
          <div>
            <span className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-3 inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              Safety Architecture
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Your safety is engineered into every meter
          </h1>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm md:text-base font-medium">
            From dual-verification matching to continuous journey monitoring, experience worry-free travel.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-7 hover:border-white/20 transition-all duration-300 shadow-xl group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 ${p.iconColor} flex items-center justify-center text-xl mb-5 shadow-inner`}>
                {p.icon}
              </div>
              <h3 className="font-bold text-white mb-2 text-lg font-display">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Emergency Card */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-950/50">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 inline-block">
              Priority Response Team
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 font-display">
              Need immediate assistance during a ride?
            </h3>
            <p className="text-slate-300 text-sm max-w-lg font-medium leading-relaxed">
              Our safety command desk is staffed 24/7/365 with trained security responders ready to assist instantly.
            </p>
          </div>
          <a
            href="tel:+918235852423"
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 shrink-0 shadow-xl shadow-blue-600/30 active:scale-[0.98] cursor-pointer"
          >
            <FiPhoneCall />
            <span>Call 24/7 Safety Desk</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Safety
