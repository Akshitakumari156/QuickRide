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

const WhyQuickRide = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-slate-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Why QuickRide
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for trust, tuned for speed
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:bg-slate-100/80 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white text-slate-800 flex items-center justify-center text-xl mb-5 shadow-sm border border-slate-200">
                {p.icon}
              </div>
              <h3 className="text-slate-900 font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyQuickRide
