import { useState } from "react"
import { FiChevronDown, FiMail, FiPhone, FiMessageCircle, FiHelpCircle } from "react-icons/fi"

const faqs = [
  {
    q: "How do I book an instant ride?",
    a: "Select your pickup and destination on the map, choose your preferred vehicle class (QuickGo, QuickXL), review the upfront fare calculation, and tap confirm. The nearest available captain is automatically dispatched.",
  },
  {
    q: "How does the 4-digit OTP work?",
    a: "Once a captain accepts your trip, a unique 4-digit safety code appears on your screen. Share this code with the driver in person when they arrive to initiate your trip safely.",
  },
  {
    q: "What if I need to cancel a ride?",
    a: "You can cancel free of charge before the captain reaches your pickup spot. Cancellations made more than 3 minutes after arrival may incur a minor nominal fee.",
  },
  {
    q: "How do I register as a driver captain?",
    a: "Click 'Register as Captain' in the navigation bar, input your vehicle details and license information, and our automated verification will approve your account within 24 hours.",
  },
  {
    q: "Is real-time trip sharing available?",
    a: "Yes! Every trip features live telemetry tracking. You can share your live tracking link directly via WhatsApp, SMS, or Telegram with friends and family.",
  },
]

const FaqItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-white/10 last:border-none">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
    >
      <span className="font-bold text-white text-base md:text-lg pr-4 font-display group-hover:text-blue-400 transition-colors">
        {item.q}
      </span>
      <div className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 shrink-0 transition-transform duration-300 ${
        isOpen ? "rotate-180 text-blue-400 bg-blue-500/10 border-blue-500/30" : ""
      }`}>
        <FiChevronDown />
      </div>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-40 pb-5" : "max-h-0"
      }`}
    >
      <p className="text-sm text-slate-400 leading-relaxed pr-8 font-medium">{item.a}</p>
    </div>
  </div>
)

const SupportPage = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="w-full min-h-screen bg-[#090d16] text-white">
      {/* Header */}
      <div className="relative py-16 md:py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center relative z-10">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 text-2xl mb-6 shadow-lg shadow-blue-500/20">
            <FiHelpCircle />
          </span>
          <div>
            <span className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-3 inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              Assistance & FAQ
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            How can we assist you today?
          </h1>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm md:text-base font-medium">
            Explore common questions below or get in touch directly with our round-the-clock support agents.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-24">
        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <a
            href="mailto:support@quickride.app"
            className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 flex flex-col items-start gap-4 hover:border-white/20 transition-all duration-300 shadow-xl group"
          >
            <span className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <FiMail />
            </span>
            <div>
              <p className="font-bold text-white text-base font-display">Email Helpdesk</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">support@quickride.app</p>
            </div>
          </a>

          <a
            href="tel:+918235852423"
            className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 flex flex-col items-start gap-4 hover:border-white/20 transition-all duration-300 shadow-xl group"
          >
            <span className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <FiPhone />
            </span>
            <div>
              <p className="font-bold text-white text-base font-display">Direct Phone</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">+91 82358 52423</p>
            </div>
          </a>

          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 flex flex-col items-start gap-4 shadow-xl">
            <span className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center text-xl">
              <FiMessageCircle />
            </span>
            <div>
              <p className="font-bold text-white text-base font-display">Live In-App Chat</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">24/7 Real-Time Operator</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl p-6 md:p-10">
          <h2 className="text-2xl font-black text-white pb-6 border-b border-white/10 font-display">
            Frequently Asked Questions
          </h2>
          <div>
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage
