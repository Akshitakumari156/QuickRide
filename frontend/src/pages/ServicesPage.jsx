import { useNavigate } from "react-router-dom"
import { FiUser, FiUsers, FiPackage, FiTruck, FiCheck, FiArrowRight } from "react-icons/fi"

const services = [
  {
    icon: <FiUser />,
    title: "QuickGo",
    tag: "Economy & Daily",
    desc: "Quick, affordable everyday rides for one or two passengers with swift matching.",
    features: ["Nearest available captain within minutes", "Upfront calculated fare guarantee", "Cashless UPI, card & cash payments"],
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: <FiUsers />,
    title: "QuickXL",
    tag: "Groups & Family",
    desc: "Extra seats and premium boot space for up to six passengers per trip.",
    features: ["Roomy MPVs & premium SUVs", "Luggage friendly layout", "Climate control & extra legroom"],
    color: "from-purple-500/20 to-indigo-600/10",
    border: "border-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: <FiPackage />,
    title: "QuickParcel",
    tag: "Instant Courier",
    desc: "Same-day pickup and drop for packages, documents, and retail items tracked live.",
    features: ["Live GPS parcel tracking", "Direct door-to-door delivery", "Photo & OTP proof of drop-off"],
    color: "from-amber-500/20 to-orange-600/10",
    border: "border-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: <FiTruck />,
    title: "QuickBiz",
    tag: "Enterprise Fleet",
    desc: "Scheduled rides and consolidated monthly billing for corporate teams and travel.",
    features: ["Employee corporate ride accounts", "Consolidated GST invoicing", "Priority dedicated captain dispatch"],
    color: "from-emerald-500/20 to-teal-600/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
]

const ServicesPage = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen bg-[#090d16] text-white">
      {/* Header banner */}
      <div className="relative py-16 md:py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center relative z-10">
          <span className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-3 inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            Full Mobility Spectrum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            A specialized ride for every journey
          </h1>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm md:text-base font-medium">
            From daily city commutes to scheduled corporate trips and urgent package dispatch, explore our versatile fleet.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className={`bg-slate-900/60 backdrop-blur-xl rounded-3xl border ${s.border} shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 ${s.iconColor} flex items-center justify-center text-2xl shadow-inner`}>
                    {s.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-300 bg-white/5 border border-white/10 rounded-full px-3 py-1 uppercase tracking-wider">
                    {s.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 font-display">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">{s.desc}</p>

                <ul className="space-y-3 mb-8">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 text-xs">
                        <FiCheck />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate("/")}
                className="w-full rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 shadow-lg shadow-blue-600/25 transition-all duration-200 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Book {s.title}</span>
                <FiArrowRight className="text-sm" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
