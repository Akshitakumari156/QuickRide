import banner from "../../assets/homepagebanner.jpg"
import RideLocationForm from "../ride/RideLocationForm"

const HeroSection = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-24 md:pt-24 md:pb-32 relative">
        <div className="flex flex-col lg:flex-row items-center gap-14">
          {/* Left: copy + form */}
          <div className="w-full lg:w-[55%]">
            <span className="inline-flex items-center gap-2 text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Now live across the city
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-slate-900">
              Ride smart.
              <br />
              Move <span className="text-slate-900 border-b-4 border-slate-900 pb-1">fast.</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
              Book a ride in seconds, track your captain in real time, and get
              where you're going — safely, reliably, at a price that makes sense.
            </p>

            <div className="mt-8 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 md:p-5 relative z-10">
              <RideLocationForm />
            </div>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="text-2xl font-bold text-slate-900">2M+</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium uppercase tracking-wide">Rides completed</p>
              </div>
              <div className="w-px h-9 bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-slate-900">50k+</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium uppercase tracking-wide">Active captains</p>
              </div>
              <div className="w-px h-9 bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-slate-900">4.8★</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium uppercase tracking-wide">Average rating</p>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="w-full lg:w-[45%] relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-slate-200 to-slate-50 rounded-[2rem] blur-2xl opacity-60" />
            <img
              src={banner}
              alt="QuickRide ride"
              className="relative w-full h-auto object-cover rounded-2xl shadow-2xl shadow-slate-300/60 border border-slate-200"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
