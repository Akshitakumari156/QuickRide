import banner from "../../assets/homepagebanner.jpg"
import RideLocationForm from "../ride/RideLocationForm"

const HeroSection = () => {
  return (
    <section className="relative w-full bg-[#0b1e30] overflow-hidden">
      {/* ambient route-line motif */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <path
          d="M-50,650 C250,500 350,750 650,550 C900,380 1050,700 1500,400"
          stroke="#60A5FA"
          strokeWidth="3"
          strokeDasharray="8 14"
          fill="none"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-24 md:pt-24 md:pb-32 relative">
        <div className="flex flex-col lg:flex-row items-center gap-14">
          {/* Left: copy + form */}
          <div className="w-full lg:w-[55%]">
            <span className="inline-flex items-center gap-2 text-blue-300 bg-blue-400/10 border border-blue-400/20 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
              Now live across the city
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white">
              Ride smart.
              <br />
              Move <span className="text-blue-400">fast.</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-slate-300 max-w-lg leading-relaxed">
              Book a ride in seconds, track your captain in real time, and get
              where you're going — safely, reliably, at a price that makes sense.
            </p>

            <div className="mt-8 bg-white rounded-2xl shadow-2xl shadow-black/30 p-4 md:p-5">
              <RideLocationForm />
            </div>

            <div className="mt-8 flex items-center gap-8">
              <div>
                <p className="text-2xl font-bold text-white">2M+</p>
                <p className="text-xs text-slate-400 mt-0.5">Rides completed</p>
              </div>
              <div className="w-px h-9 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">50k+</p>
                <p className="text-xs text-slate-400 mt-0.5">Active captains</p>
              </div>
              <div className="w-px h-9 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">4.8★</p>
                <p className="text-xs text-slate-400 mt-0.5">Average rating</p>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="w-full lg:w-[45%] relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-indigo-500/10 rounded-[2rem] blur-2xl" />
            <img
              src={banner}
              alt="UrbanMove ride"
              className="relative w-full h-auto object-cover rounded-2xl shadow-2xl shadow-black/40 border border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
