import { FiCheck } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

const plans = [
  {
    name: "UrbanGo",
    price: "₹9",
    unit: "/km",
    base: "₹40 base fare",
    highlight: false,
    features: ["1–2 passengers", "Standard hatchback/sedan", "Live tracking", "Cash & UPI"],
  },
  {
    name: "UrbanXL",
    price: "₹15",
    unit: "/km",
    base: "₹70 base fare",
    highlight: true,
    features: ["Up to 6 passengers", "SUV / MPV fleet", "Live tracking", "Priority matching"],
  },
  {
    name: "UrbanBiz",
    price: "Custom",
    unit: "",
    base: "Monthly billing",
    highlight: false,
    features: ["Team ride accounts", "Consolidated invoice", "Dedicated support", "Scheduled trips"],
  },
]

const PricingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full bg-[#F2F4F5]">
      <div className="bg-[#0b1e30] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Pricing
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Simple, upfront fares
          </h1>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto">
            Know your fare before you book. No surge surprises, no hidden fees.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-8 relative ${
                p.highlight
                  ? "bg-[#0b1e30] text-white shadow-2xl shadow-black/20 md:-translate-y-4"
                  : "bg-white text-[#0b1e30] border border-black/5 shadow-sm"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                  MOST CHOSEN
                </span>
              )}

              <h3 className="text-lg font-bold mb-1">{p.name}</h3>
              <p className={`text-sm mb-6 ${p.highlight ? "text-slate-400" : "text-slate-500"}`}>
                {p.base}
              </p>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className={p.highlight ? "text-slate-400" : "text-slate-500"}>{p.unit}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        p.highlight ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <FiCheck size={12} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/")}
                className={`w-full rounded-xl font-semibold py-3 transition-colors duration-200 ${
                  p.highlight
                    ? "bg-white text-[#0b1e30] hover:bg-slate-100"
                    : "bg-[#0b1e30] text-white hover:bg-[#132b4d]"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-10">
          Fares shown are estimates and may vary with traffic, tolls, and demand at the time of booking.
        </p>
      </div>
    </div>
  )
}

export default PricingPage
