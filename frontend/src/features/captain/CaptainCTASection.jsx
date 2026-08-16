import { useNavigate } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"

const CaptainCTASection = () => {
  const navigate = useNavigate()
  const handleCTABtn = () => navigate("/captain/register")

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-slate-900/20">
          <div className="flex-1 relative z-10">
            <span className="inline-block text-slate-300 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase mb-5">
              Drive with UrbanMove
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Turn your car into an income
            </h2>
            <p className="text-slate-300 max-w-xl text-base md:text-lg leading-relaxed font-medium">
              Register as a captain and start earning on your own schedule. Simple
              onboarding, fair pricing, and support whenever you need it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleCTABtn}
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all duration-200 shadow-md"
            >
              Register as Captain
              <FiArrowRight />
            </button>
            <button
              onClick={() => navigate("/services")}
              className="inline-flex items-center justify-center border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-200"
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
