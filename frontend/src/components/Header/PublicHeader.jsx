import { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { FiMenu, FiX } from "react-icons/fi"
import Button from "../Button"
import { useAuth } from "../../context/AuthContext"

const navLinkClass = ({ isActive }) =>
  `relative py-2 text-sm lg:text-base font-medium tracking-wide transition-all duration-300 ease-in-out
   after:absolute after:left-1/2 after:-bottom-0.5 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 after:-translate-x-1/2
   ${
     isActive
       ? "after:w-full text-white font-semibold"
       : "after:w-0 text-slate-300 hover:text-white hover:after:w-full"
   }`

const Header = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuth, logout, role } = useAuth()
  const location = useLocation()

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
    }  if (location.pathname.startsWith("/captain")) {
      navigate("/captain/register")
    }
    else {
      navigate("/register")
    }
    setOpen(false)
  }

  return (
    <header className="w-full bg-[#0b1e30] border-b border-white/5 sticky top-0 z-[9999] backdrop-blur-md shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-20">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            U
          </div>
          <span className="text-xl font-bold tracking-tight text-white transition-colors duration-300">
            Urban<span className="text-blue-400 font-extrabold group-hover:text-blue-300 transition-colors">Move</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink>
          <NavLink to="/safety" className={navLinkClass}>Safety</NavLink>
          <NavLink to="/home" className={navLinkClass}>Service</NavLink>
          <NavLink to="/support" className={navLinkClass}>Support</NavLink>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            onClick={handleAuthClick}
            label={isAuth ? "Sign Out" : "Login"}
            bg="rgba(255, 255, 255, 0.05)"
            hoverbg="rgba(255, 255, 255, 0.1)"
            textColor="#E2E8F0"
            className="rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide border border-white/10 transition-all duration-300 backdrop-blur-sm"
          />
          <Button
            onClick={handleSecondaryClick}
            label={isAuth ? "Dashboard" : "Register"}
            bg="#FFFFFF"
            textColor="#0b1e30"
            hoverbg="#F1F5F9"
            className="rounded-full px-6 py-2.5 text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white/80 hover:text-white p-2 rounded-lg bg-white/5 transition-colors text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#0b1e30] transition-all duration-300 ease-in-out border-t border-white/5 overflow-hidden ${
          open ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-1.5">
            <NavLink onClick={() => setOpen(false)} to="/pricing" className={navLinkClass}>Pricing</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/safety" className={navLinkClass}>Safety</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/home" className={navLinkClass}>Service</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/support" className={navLinkClass}>Support</NavLink>
          </div>

          {/* Mobile Action Buttons */}
          <div className="pt-5 border-t border-white/10 flex flex-col gap-3">
            <Button
              onClick={handleAuthClick}
              label={isAuth ? "Sign Out" : "Login"}
              bg="rgba(255, 255, 255, 0.05)"
              hoverbg="rgba(255, 255, 255, 0.1)"
              textColor="#E2E8F0"
              className="w-full rounded-xl py-3 text-sm font-medium border border-white/10"
            />
            <Button
              onClick={handleSecondaryClick}
              label={isAuth ? "Dashboard" : "Register"}
              bg="#FFFFFF"
              textColor="#0b1e30"
              hoverbg="#F1F5F9"
              className="w-full rounded-xl py-3 text-sm font-bold shadow-sm"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header