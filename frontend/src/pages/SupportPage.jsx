import { useState } from "react"
import { FiChevronDown, FiMail, FiPhone, FiMessageCircle } from "react-icons/fi"

const faqs = [
  {
    q: "How do I book a ride?",
    a: "Open the app, set your pickup and drop location, choose a ride type, and confirm. A captain will be matched to you within moments.",
  },
  {
    q: "What if I need to cancel a ride?",
    a: "You can cancel from the ride screen any time before pickup. Cancellations made after a captain is on the way may include a small fee.",
  },
  {
    q: "How is the fare calculated?",
    a: "Fares are based on distance, ride type, and current demand, and are shown upfront before you confirm your booking.",
  },
  {
    q: "How do I become a captain?",
    a: "Tap Register as Captain, upload your documents and vehicle details, and our team will verify your account within 24-48 hours.",
  },
  {
    q: "Is my ride tracked for safety?",
    a: "Yes. Every trip is tracked live from pickup to drop-off, and can be shared with a trusted contact in real time.",
  },
]

const FaqItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-black/5 last:border-none">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 text-left"
    >
      <span className="font-semibold text-[#0b1e30] text-sm md:text-base pr-4">
        {item.q}
      </span>
      <FiChevronDown
        className={`shrink-0 text-slate-400 transition-transform duration-300 ${
          isOpen ? "rotate-180 text-blue-600" : ""
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-40 pb-5" : "max-h-0"
      }`}
    >
      <p className="text-sm text-slate-500 leading-relaxed pr-8">{item.a}</p>
    </div>
  </div>
)

const SupportPage = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="w-full bg-[#F2F4F5]">
      <div className="bg-[#0b1e30] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Support
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            We're here to help
          </h1>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto">
            Find answers below, or reach our team directly — we usually reply within an hour.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <a
            href="mailto:support@urbanmove.app"
            className="bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-start gap-3"
          >
            <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
              <FiMail />
            </span>
            <div>
              <p className="font-semibold text-[#0b1e30] text-sm">Email us</p>
              <p className="text-xs text-slate-500 mt-1">support@urbanmove.app</p>
            </div>
          </a>

          <a
            href="tel:+919876543210"
            className="bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-start gap-3"
          >
            <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
              <FiPhone />
            </span>
            <div>
              <p className="font-semibold text-[#0b1e30] text-sm">Call us</p>
              <p className="text-xs text-slate-500 mt-1">+91 98765 43210</p>
            </div>
          </a>

          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 flex flex-col items-start gap-3">
            <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
              <FiMessageCircle />
            </span>
            <div>
              <p className="font-semibold text-[#0b1e30] text-sm">Live chat</p>
              <p className="text-xs text-slate-500 mt-1">Available 24/7 in-app</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm px-6 md:px-8">
          <h2 className="text-xl font-bold text-[#0b1e30] pt-6 pb-2">
            Frequently asked questions
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
