import { useNavigate } from "react-router-dom"
import { FiUser, FiUsers, FiPackage, FiTruck, FiCheck } from "react-icons/fi"

const services = [
  {
    icon: <FiUser />,
    title: "UrbanGo",
    tag: "Most popular",
    desc: "Quick, affordable everyday rides for one or two passengers.",
    features: ["Nearest available captain", "Upfront fare", "Cashless & cash payments"],
  },
  {
    icon: <FiUsers />,
    title: "UrbanXL",
    tag: "Groups & families",
    desc: "Extra seats and boot space for up to six passengers per trip.",
    features: ["Roomy sedans & SUVs", "Split-fare with friends", "Child seat on request"],
  },
  {
    icon: <FiPackage />,
    title: "UrbanParcel",
    tag: "Courier",
    desc: "Same-day pickup and drop for packages and documents, tracked live.",
    features: ["Live parcel tracking", "Same-day delivery", "Proof of drop-off"],
  },
  {
    icon: <FiTruck />,
    title: "UrbanBiz",
    tag: "For teams",
    desc: "Scheduled rides and consolidated monthly billing for businesses.",
    features: ["Employee ride accounts", "Monthly invoicing", "Priority dispatch"],
  },
]

const ServicesPage = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full bg-[#F2F4F5]">
      {/* Header banner */}
      <div className="bg-[#0b1e30] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Our services
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            A ride for every plan
          </h1>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto">
            From a quick solo trip to a same-day parcel drop, UrbanMove has a
            service built around how you actually move.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
                  {s.icon}
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 rounded-full px-3 py-1">
                  {s.tag}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#0b1e30] mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">{s.desc}</p>

              <ul className="space-y-2.5 mb-8">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <FiCheck size={12} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/services")}
                className="w-full rounded-xl bg-[#0b1e30] text-white font-semibold py-3 hover:bg-[#132b4d] transition-colors duration-200"
              >
                Book {s.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
