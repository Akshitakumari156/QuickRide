import { Link } from "react-router-dom"
import { FiArrowRight, FiUser, FiUsers, FiPackage, FiTruck, FiZap, FiCheck } from "react-icons/fi"

const services = [
  {
    icon: <FiUser />,
    title: "QuickGo",
    tag: "Most Popular",
    desc: "Affordable everyday rides for one or two, right from your street corner.",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    specs: ["Up to 4 Seats", "Climate AC", "2.8 min Arrival", "Base ₹40"],
  },
  {
    icon: <FiUsers />,
    title: "QuickXL",
    tag: "Spacious",
    desc: "Extra room for groups, luggage, and families with premium certified captains.",
    color: "from-purple-500/20 to-indigo-600/10",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    specs: ["Up to 6 Seats", "Spacious Boot", "Extra Legroom", "Base ₹80"],
  },
  {
    icon: <FiPackage />,
    title: "QuickParcel",
    tag: "Instant Delivery",
    desc: "Same-day courier pickup and delivery across town with real-time GPS pin tracking.",
    color: "from-amber-500/20 to-orange-600/10",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    specs: ["Up to 20kg", "Photo Proof", "Live Pin Tracking", "Base ₹30"],
  },
  {
    icon: <FiTruck />,
    title: "QuickBiz",
    tag: "Corporate",
    desc: "Executive sedans and monthly consolidated invoicing built for teams.",
    color: "from-emerald-500/20 to-teal-600/10",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    specs: ["Executive Sedan", "GST Invoicing", "Priority Support", "Base ₹120"],
  },
]

const ServicesPreview = () => {
  return (
    <section className="w-full bg-[#060a12] text-white py-20 md:py-28 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-3 inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              Fleet Options
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-lg font-display">
              Tailored rides for every travel requirement
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider group shrink-0 transition-colors px-5 py-3 rounded-2xl bg-slate-900 border border-white/15 hover:border-blue-500/40 shadow-lg"
          >
            <span>Explore All Fleet Tiers</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-1 text-blue-400 text-sm" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className={`bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-7 border ${s.border} shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between`}
            >
              <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${s.color} rounded-full blur-2xl pointer-events-none`} />

              <div>
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-950 border border-white/10 ${s.iconColor} flex items-center justify-center text-xl shadow-inner`}>
                    {s.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${s.badgeColor}`}>
                    {s.tag}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white mb-2 font-display relative z-10">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium relative z-10 mb-6">{s.desc}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10 relative z-10">
                {s.specs.map((spec) => (
                  <div key={spec} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <FiCheck className="text-emerald-400 text-xs shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesPreview
