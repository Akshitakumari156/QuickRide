import { Link } from "react-router-dom"
import { FiInstagram, FiTwitter, FiFacebook, FiLinkedin, FiMapPin, FiMail, FiPhone } from "react-icons/fi"

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Services", to: "/services" },
      { label: "Pricing", to: "/pricing" },
      { label: "Safety", to: "/safety" },
      { label: "Become a Captain", to: "/captain/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/support" },
      { label: "Contact Us", to: "/support" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
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
    <footer className="w-full bg-[#0b1e30] text-slate-300 relative overflow-hidden">
      {/* subtle route-line motif */}
      <div className="absolute -top-10 left-0 w-full h-24 opacity-[0.07] pointer-events-none">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,60 C200,10 300,90 500,50 C700,10 800,90 1000,40 C1100,15 1150,60 1200,30"
            stroke="#60A5FA"
            strokeWidth="4"
            strokeDasharray="10 12"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
                U
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Urban<span className="text-blue-400 font-extrabold">Move</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Reliable rides, on your schedule. UrbanMove connects riders and captains
              across the city, every day, at a fair price.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <FiMapPin className="text-blue-400 shrink-0" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <FiMail className="text-blue-400 shrink-0" />
                <span>support@urbanmove.app</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <FiPhone className="text-blue-400 shrink-0" />
                <span>+91 82358 52423</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200"
                      >
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
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} UrbanMove Technologies Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="social link"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-200"
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
