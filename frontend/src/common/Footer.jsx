import { Link } from "react-router-dom"
import { FiInstagram, FiTwitter, FiFacebook, FiLinkedin, FiMapPin, FiMail, FiPhone, FiArrowRight, FiShield, FiCheckCircle } from "react-icons/fi"

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/" },
      { label: "Our Services", to: "/services" },
      { label: "Safety Standards", to: "/safety" },
      { label: "Pricing & Plans", to: "/pricing" },
    ],
  },
  {
    title: "Mobility",
    links: [
      { label: "QuickGo Rides", to: "/services" },
      { label: "QuickXL Group", to: "/services" },
      { label: "QuickParcel Courier", to: "/services" },
      { label: "Captain Registration", to: "/captain/register" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "Help & FAQ Center", to: "/support" },
      { label: "24/7 Safety Line", to: "/safety" },
      { label: "Terms of Service", to: "/support" },
      { label: "Privacy Policy", to: "/support" },
    ],
  },
]

const socials = [
  { icon: <FiInstagram />, href: "https://instagram.com" },
  { icon: <FiTwitter />, href: "https://twitter.com" },
  { icon: <FiFacebook />, href: "https://facebook.com" },
  { icon: <FiLinkedin />, href: "https://linkedin.com" },
]

const Footer = () => {
  return (
    <footer className="w-full bg-[#060a12] text-slate-300 border-t border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/25 border border-white/20">
                Q
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-display">
                Quick<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-black">Ride</span>
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm font-medium">
              Next-generation urban mobility built for seamless booking, real-time routing, and reliable city travel at transparent rates.
            </p>

            <div className="mt-6 space-y-2.5 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                  <FiMapPin />
                </div>
                <span>Pan-India Mobility Network</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                  <FiMail />
                </div>
                <span>support@quickride.app</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                  <FiPhone />
                </div>
                <span>+91 82358 52423 (24/7 Helpline)</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-4 font-display">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-500">
            © {new Date().getFullYear()} QuickRide Technologies Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="social link"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
