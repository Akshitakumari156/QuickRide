import { useState, useEffect } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi"
import Button from "../Button"
import { useAuth } from "../../context/AuthContext"

const navItems = [
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Safety", to: "/safety" },
  { label: "Support", to: "/support" },
]

const navLinkClass = ({ isActive }) =>
  `relative px-3.5 py-1.5 text-sm font-semibold tracking-tight transition-all duration-200 rounded-full
   ${
     isActive
       ? "text-white bg-white/10 shadow-sm border border-white/15"
       : "text-slate-300 hover:text-white hover:bg-white/5"
   }`

const Header = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { isAuth, logout, role } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleAuthClick = () => {
    if (isAuth) {
      logout()
      navigate(role === "captain" ? "/captain/login" : "/login")
    } else if (location.pathname.startsWith("/captain")) {
      navigate("/captain/login")
    } else {
      navigate("/login")
    }
    setOpen(false)
  }

  const handleSecondaryClick = () => {
    if (isAuth && role === "user") {
      navigate("/dashboard")
    } else if (isAuth && role === "captain") {
      navigate("/captain/dashboard")
    } else if (location.pathname.startsWith("/captain")) {
      navigate("/captain/register")
    } else {
      navigate("/register")
    }
    setOpen(false)
  }

  return (
    <header
      className={`w-full sticky top-0 z-[9999] transition-all duration-300 ${
        scrolled
          ? "bg-[#090d16]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 py-3"
          : "bg-[#090d16] border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group select-none"
          onClick={() => navigate("/")}
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/25 group-hover:scale-105 group-hover:shadow-blue-500/40 transition-all duration-300 border border-white/20">
            <span>Q</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white font-display">
            Quick<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-black">Ride</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={handleAuthClick}
            label={isAuth ? "Sign Out" : "Log In"}
            bg="transparent"
            hoverbg="rgba(255, 255, 255, 0.08)"
            textColor="#f8fafc"
            className="rounded-full px-5 py-2 text-sm font-semibold tracking-tight border border-white/10 hover:border-white/20 transition-all duration-200"
          />
          <Button
            onClick={handleSecondaryClick}
            label={isAuth ? "Dashboard" : "Sign Up"}
            bg="#2563eb"
            textColor="#ffffff"
            hoverbg="#1d4ed8"
            className="rounded-full px-6 py-2 text-sm font-semibold tracking-tight shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200"
          />
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="md:hidden text-slate-300 hover:text-white p-2 rounded-xl bg-slate-800/80 border border-white/10 transition-colors text-xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[100vh] opacity-100 border-t border-white/10 bg-[#0c1222]/95 backdrop-blur-2xl" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                onClick={() => setOpen(false)}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-3 text-base font-semibold rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Button
              onClick={handleAuthClick}
              label={isAuth ? "Sign Out" : "Log In"}
              bg="rgba(255, 255, 255, 0.05)"
              hoverbg="rgba(255, 255, 255, 0.1)"
              textColor="#f8fafc"
              className="w-full rounded-xl py-3 text-sm font-semibold border border-white/10"
            />
            <Button
              onClick={handleSecondaryClick}
              label={isAuth ? "Dashboard" : "Sign Up"}
              bg="#2563eb"
              textColor="#ffffff"
              hoverbg="#1d4ed8"
              className="w-full rounded-xl py-3 text-sm font-semibold shadow-lg shadow-blue-600/30"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
