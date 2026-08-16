import { Link } from "react-router-dom"
import { FiArrowRight, FiUser, FiUsers, FiPackage, FiTruck } from "react-icons/fi"

const services = [
  {
    icon: <FiUser />,
    title: "UrbanGo",
    desc: "Affordable everyday rides for one or two, right from your street corner.",
  },
  {
    icon: <FiUsers />,
    title: "UrbanXL",
    desc: "Extra room for groups and families, up to six passengers per trip.",
  },
  {
    icon: <FiPackage />,
    title: "UrbanParcel",
    desc: "Same-day courier pickup and drop across the city, tracked live.",
  },
  {
    icon: <FiTruck />,
    title: "UrbanBiz",
    desc: "Scheduled rides and monthly billing built for teams and offices.",
  },
]

const ServicesPreview = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-slate-500 font-semibold text-sm tracking-widest uppercase mb-3">
              What we offer
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight max-w-lg">
              One app, every way to move
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm group shrink-0 transition-colors"
          >
            View all services
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl mb-5">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesPreview
