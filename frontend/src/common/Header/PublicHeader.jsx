import { useState, useEffect } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { FiMenu, FiX } from "react-icons/fi"
import Button from "../Button"
import { useAuth } from "../../context/AuthContext"

const navItems = [
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Safety", to: "/safety" },
  { label: "Support", to: "/support" },
]

const navLinkClass = ({ isActive }) =>
  `relative py-2 text-sm lg:text-base font-medium tracking-wide transition-colors duration-200
   ${
     isActive
       ? "text-slate-900 font-semibold"
       : "text-slate-500 hover:text-slate-900"
   }`

const Header = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { isAuth, logout, role } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleAuthClick = () => {
    if (isAuth) {
      logout()
      navigate(role === "captain" ? "/captain/login" : "/login")
    }
    if (location.pathname.startsWith("/captain")) {
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
    }
    if (location.pathname.startsWith("/captain")) {
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
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-20">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-slate-800 transition-colors duration-300">
            U
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Urban<span className="font-extrabold">Move</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button
            onClick={handleAuthClick}
            label={isAuth ? "Sign Out" : "Log In"}
            bg="transparent"
            hoverbg="#f1f5f9"
            textColor="#0f172a"
            className="rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300"
          />
          <Button
            onClick={handleSecondaryClick}
            label={isAuth ? "Dashboard" : "Sign Up"}
            bg="#0f172a"
            textColor="#ffffff"
            hoverbg="#1e293b"
            className="rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-300"
          />
        </div>

        <button
          className="md:hidden text-slate-600 hover:text-slate-900 p-2 rounded-lg bg-slate-50 transition-colors text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white transition-all duration-300 ease-in-out border-t border-slate-100 overflow-hidden ${
          open ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6 space-y-6 shadow-xl">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <NavLink key={item.to} onClick={() => setOpen(false)} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="pt-5 border-t border-slate-100 flex flex-col gap-3">
            <Button
              onClick={handleAuthClick}
              label={isAuth ? "Sign Out" : "Log In"}
              bg="#f1f5f9"
              hoverbg="#e2e8f0"
              textColor="#0f172a"
              className="w-full rounded-xl py-3 text-sm font-medium"
            />
            <Button
              onClick={handleSecondaryClick}
              label={isAuth ? "Dashboard" : "Sign Up"}
              bg="#0f172a"
              textColor="#ffffff"
              hoverbg="#1e293b"
              className="w-full rounded-xl py-3 text-sm font-semibold shadow-sm"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
