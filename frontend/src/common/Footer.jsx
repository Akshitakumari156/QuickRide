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
    <footer className="w-full bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                Q
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Quick<span className="font-extrabold">Ride</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs font-medium">
              Reliable rides, on your schedule. QuickRide connects riders and captains
              across the city, every day, at a fair price.
            </p>

            <div className="mt-6 space-y-3 text-sm font-medium">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-900">
                  <FiMapPin />
                </div>
                <span>Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-900">
                  <FiMail />
                </div>
                <span>support@quickride.app</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-900">
                  <FiPhone />
                </div>
                <span>+91 82358 52423</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-slate-900 font-bold text-sm tracking-wide mb-4 uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200"
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
        <div className="mt-14 pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
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
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
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
