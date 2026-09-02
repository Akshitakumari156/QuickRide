import { FiMapPin, FiNavigation, FiSmile, FiArrowRight } from "react-icons/fi"

const steps = [
  {
    icon: <FiMapPin />,
    title: "Select Pickup & Drop",
    desc: "Enter your coordinates or search addresses with instant automated routing.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <FiNavigation />,
    title: "Instant Dual-Lock Match",
    desc: "Nearby captains receive your request in real time and accept within seconds.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: <FiSmile />,
    title: "OTP Verification & Travel",
    desc: "Provide your secure 4-digit code, track your live journey, and reach your destination.",
    color: "from-emerald-500 to-teal-500",
  },
]

const HowItWorks = () => {
  return (
    <section className="w-full bg-[#0b101d] text-white py-20 md:py-28 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-3 inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            Frictionless Flow
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            How QuickRide works
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base font-medium">
            Experience effortless booking with guaranteed safety protocols from request to drop-off.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex flex-col items-start bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-xl group"
            >
              <div className="w-full flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20`}>
                  {step.icon}
                </div>
                <span className="text-2xl font-black text-slate-700 font-display group-hover:text-slate-500 transition-colors">
                  0{i + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-display">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
