import { FiShield, FiClock, FiTag, FiHeadphones } from "react-icons/fi"

const points = [
  {
    icon: <FiShield />,
    title: "100% Verified Captains",
    desc: "Every driver undergoes comprehensive background screening, license vetting, and vehicle inspection.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: <FiClock />,
    title: "Precision Live ETAs",
    desc: "Powered by open spatial routing to guarantee pinpoint arrival estimates without guess-work.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <FiTag />,
    title: "Guaranteed Upfront Fare",
    desc: "What you see is what you pay. Transparent pricing with no surprise multipliers at your stop.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <FiHeadphones />,
    title: "24/7 Safety Helpline",
    desc: "Real humans and dedicated safety responders available around the clock with one tap.",
    color: "from-emerald-500 to-teal-500",
  },
]

const WhyQuickRide = () => {
  return (
    <section className="w-full bg-[#0b101d] text-white py-20 md:py-28 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-3 inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            Trust & Excellence
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Built for trust, tuned for speed
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base font-medium">
            Engineered from the ground up to give riders and captains complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-7 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-xl group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${p.color} text-white flex items-center justify-center text-xl mb-6 shadow-lg shadow-blue-500/20`}>
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyQuickRide
