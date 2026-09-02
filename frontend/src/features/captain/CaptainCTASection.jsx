import { useNavigate } from "react-router-dom"
import { FiArrowRight, FiAward, FiClock, FiDollarSign } from "react-icons/fi"

const CaptainCTASection = () => {
  const navigate = useNavigate()
  const handleCTABtn = () => navigate("/captain/register")

  return (
    <section className="w-full bg-[#090d16] py-12 md:py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950/60 via-slate-900/90 to-indigo-950/60 text-white p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 border border-blue-500/20 shadow-2xl shadow-blue-950/50 backdrop-blur-2xl">
          {/* Ambient Lighting Background Accents */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

          <div className="flex-1 relative z-10">
            <span className="inline-block text-blue-400 bg-blue-500/15 border border-blue-500/30 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase mb-5">
              Drive & Earn with QuickRide
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight text-white font-display">
              Turn your vehicle into a sustainable income
            </h2>
            <p className="text-slate-300 max-w-xl text-base md:text-lg leading-relaxed font-medium">
              Join 65,000+ certified captains driving on their own schedule. Daily payouts, guaranteed minimum earnings, and zero upfront signup fees.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-bold text-slate-300">
              <div className="flex items-center gap-2">
                <FiDollarSign className="text-emerald-400 text-base" />
                <span>Daily Instant Payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-blue-400 text-base" />
                <span>100% Flexible Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <FiAward className="text-amber-400 text-base" />
                <span>Bonus Incentives</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0 w-full lg:w-auto">
            <button
              onClick={handleCTABtn}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-xl shadow-blue-600/30 active:scale-[0.98] cursor-pointer"
            >
              <span>Register as Captain</span>
              <FiArrowRight />
            </button>
            <button
              onClick={() => navigate("/services")}
              className="inline-flex items-center justify-center border border-white/15 text-slate-200 bg-white/5 hover:bg-white/10 hover:border-white/25 px-8 py-4 rounded-2xl font-bold transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaptainCTASection
