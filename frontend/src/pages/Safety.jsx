import { FiShield, FiMapPin, FiPhoneCall, FiUserCheck, FiAlertTriangle } from "react-icons/fi"

const pillars = [
  {
    icon: <FiUserCheck />,
    title: "Verified captains",
    desc: "Every captain passes an identity and background check before their first ride.",
  },
  {
    icon: <FiMapPin />,
    title: "Live trip tracking",
    desc: "Your route is tracked in real time and can be shared with anyone you trust.",
  },
  {
    icon: <FiPhoneCall />,
    title: "In-app emergency line",
    desc: "One tap connects you to our safety team or local emergency services.",
  },
  {
    icon: <FiAlertTriangle />,
    title: "Trip anomaly alerts",
    desc: "Unexpected stops or route changes are flagged automatically for review.",
  },
]

const Safety = () => {
  return (
    <div className="w-full bg-[#F2F4F5]">
      <div className="bg-[#0b1e30] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/15 text-blue-400 text-2xl mb-6">
            <FiShield />
          </span>
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Safety
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Every ride, built on trust
          </h1>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto">
            Safety isn't a feature we bolt on — it's checked before, during, and
            after every single trip on UrbanMove.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl border border-black/5 shadow-sm p-7 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-5">
                {p.icon}
              </div>
              <h3 className="font-bold text-[#0b1e30] mb-2">{p.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-[#0b1e30] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Something feel off during a ride?
            </h3>
            <p className="text-slate-300 text-sm max-w-md">
              Reach our 24/7 safety line directly from the app, any time, day or night.
            </p>
          </div>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 bg-white text-[#0b1e30] px-6 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-colors duration-200 shrink-0"
          >
            <FiPhoneCall />
            Call Safety Line
          </a>
        </div>
      </div>
    </div>
  )
}

export default Safety
