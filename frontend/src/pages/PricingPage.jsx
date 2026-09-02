import { FiCheck, FiZap } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

const plans = [
  {
    name: "QuickGo",
    price: "₹9",
    unit: "/km",
    base: "₹40 base fare",
    highlight: false,
    badge: "Everyday Ride",
    features: ["1–2 passengers", "Standard hatchback & sedan", "Real-time Live GPS Tracking", "Cash, UPI & Digital Wallets"],
  },
  {
    name: "QuickXL",
    price: "₹15",
    unit: "/km",
    base: "₹70 base fare",
    highlight: true,
    badge: "Most Popular",
    features: ["Up to 6 passengers", "Spacious SUV / MPV fleet", "Priority matching algorithm", "Extra luggage boot space"],
  },
  {
    name: "QuickBiz",
    price: "Custom",
    unit: "",
    base: "Monthly corporate billing",
    highlight: false,
    badge: "Enterprise",
    features: ["Team ride accounts", "Consolidated monthly invoices", "Dedicated 24/7 account manager", "Scheduled recurring dispatch"],
  },
]

const PricingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen bg-[#090d16] text-white">
      {/* Header Banner */}
      <div className="relative py-16 md:py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center relative z-10">
          <span className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-3 inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            Predictable Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Simple, upfront fares without hidden surcharges
          </h1>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm md:text-base font-medium">
            Know your exact fare calculation before confirming your ride. Clear kilometer and time metrics.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl p-8 relative flex flex-col justify-between transition-all duration-300 ${
                p.highlight
                  ? "bg-gradient-to-b from-slate-900/90 via-blue-950/40 to-slate-900/90 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/15 md:-translate-y-3"
                  : "bg-slate-900/50 border border-white/10 shadow-xl hover:border-white/20"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black px-4 py-1 rounded-full tracking-wider uppercase shadow-lg shadow-blue-600/30 flex items-center gap-1.5">
                  <FiZap className="text-xs" /> {p.badge}
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold font-display text-white">{p.name}</h3>
                  {!p.highlight && (
                    <span className="text-[10px] font-bold text-slate-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full uppercase">
                      {p.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-slate-400 mb-6">
                  {p.base}
                </p>

                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-black font-display text-white">{p.price}</span>
                  <span className="text-slate-400 font-semibold text-sm">{p.unit}</span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs ${p.highlight ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white/10 text-slate-300'}`}>
                        <FiCheck />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate("/")}
                className={`w-full rounded-2xl font-bold py-3.5 transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                  p.highlight
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30"
                    : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                }`}
              >
                Book with {p.name}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-500 mt-12 font-medium">
          * Fares shown are calculated dynamically based on real-time routing distance and road density.
        </p>
      </div>
    </div>
  )
}

export default PricingPage
