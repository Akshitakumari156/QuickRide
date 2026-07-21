import { FiMapPin, FiNavigation, FiSmile } from "react-icons/fi"

const steps = [
  {
    icon: <FiMapPin />,
    title: "Set your route",
    desc: "Drop your pickup and destination — we'll show you the fare before you book.",
  },
  {
    icon: <FiNavigation />,
    title: "Match with a captain",
    desc: "The nearest verified captain accepts your ride and heads your way in minutes.",
  },
  {
    icon: <FiSmile />,
    title: "Sit back, arrive",
    desc: "Track the trip live, ride safely, and rate your captain when you're there.",
  },
]

const HowItWorks = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0b1e30] tracking-tight">
            Three steps to your ride
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* connecting dashed line for desktop */}
          <div className="hidden md:block absolute top-9 left-[16.5%] right-[16.5%] border-t-2 border-dashed border-blue-200" />

          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-[#0b1e30] text-blue-400 flex items-center justify-center text-2xl shadow-lg shadow-black/10 border-4 border-white ring-1 ring-blue-100">
                {step.icon}
              </div>
              <span className="mt-5 text-xs font-bold tracking-widest text-blue-500">
                STEP {i + 1}
              </span>
              <h3 className="mt-2 text-xl font-bold text-[#0b1e30]">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-[260px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
