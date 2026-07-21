import { useNavigate } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"

const CaptainCTASection = () => {
  const navigate = useNavigate()
  const handleCTABtn = () => navigate("/captain/register")

  return (
    <section className="w-full bg-[#F2F4F5] py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1e30] via-[#0f2540] to-[#132b4d] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-black/10">
          <svg
            className="absolute -right-10 -bottom-16 w-72 h-72 opacity-[0.08] pointer-events-none"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="90" stroke="#60A5FA" strokeWidth="2" fill="none" strokeDasharray="6 10" />
          </svg>

          <div className="flex-1 relative">
            <span className="inline-block text-blue-300 bg-blue-400/10 border border-blue-400/20 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-4">
              Drive with UrbanMove
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              Turn your car into an income
            </h2>
            <p className="text-slate-300 max-w-xl text-base leading-relaxed">
              Register as a captain and start earning on your own schedule. Simple
              onboarding, fair pricing, and support whenever you need it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative shrink-0">
            <button
              onClick={handleCTABtn}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0b1e30] px-6 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
            >
              Register as Captain
              <FiArrowRight />
            </button>
            <button
              onClick={() => navigate("/services")}
              className="border border-white/20 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
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
