import { FiShield, FiClock, FiTag, FiHeadphones } from "react-icons/fi"

const points = [
  {
    icon: <FiShield />,
    title: "Verified captains",
    desc: "Every captain is background-checked and rated by real riders.",
  },
  {
    icon: <FiClock />,
    title: "On-time, every time",
    desc: "Live ETAs and route tracking keep you in the loop start to finish.",
  },
  {
    icon: <FiTag />,
    title: "Upfront pricing",
    desc: "See the exact fare before you book — no surprises at drop-off.",
  },
  {
    icon: <FiHeadphones />,
    title: "24/7 support",
    desc: "Real humans on call for anything that comes up, any hour.",
  },
]

const WhyUrbanMove = () => {
  return (
    <section className="w-full bg-[#0b1e30] py-20 md:py-28 relative overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <path
          d="M-50,100 C300,300 500,50 800,250 C1050,420 1200,150 1500,300"
          stroke="#60A5FA"
          strokeWidth="3"
          strokeDasharray="8 14"
          fill="none"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Why UrbanMove
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Built for trust, tuned for speed
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm hover:bg-white/[0.08] transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center text-lg mb-5">
                {p.icon}
              </div>
              <h3 className="text-white font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUrbanMove
