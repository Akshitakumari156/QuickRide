import { useNavigate } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"

const CaptainCTASection = () => {
  const navigate = useNavigate()
  const handleCTABtn = () => navigate("/captain/register")

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-white text-gray-900 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-100/50 blur-3xl"></div>

          <div className="flex-1 relative z-10">
            <span className="inline-block text-blue-700 bg-blue-100/50 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase mb-5">
              Drive with UrbanMove
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-gray-900">
              Turn your car into an income
            </h2>
            <p className="text-gray-600 max-w-xl text-base md:text-lg leading-relaxed font-medium">
              Register as a captain and start earning on your own schedule. Simple
              onboarding, fair pricing, and support whenever you need it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleCTABtn}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            >
              Register as Captain
              <FiArrowRight />
            </button>
            <button
              onClick={() => navigate("/services")}
              className="inline-flex items-center justify-center border-2 border-gray-200 text-gray-700 bg-white px-8 py-4 rounded-full font-bold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-[0.98]"
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
