import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiUser,
  FiSettings,
  FiClock,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const navLinkClass = ({ isActive }) =>
  `relative py-2 text-sm lg:text-base font-medium tracking-wide transition-all duration-300 ease-in-out
   after:absolute after:left-1/2 after:-bottom-0.5 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 after:-translate-x-1/2
   ${
     isActive
       ? "after:w-full text-white font-semibold"
       : "after:w-0 text-slate-300 hover:text-white hover:after:w-full"
   }`;

const PrivateHeader = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user, setAuthState, logout } = useAuth();
  
  // Safe extraction to avoid breaking references
  const displayName = user?.firstname || user?.name || "User";
  const displayAvatar = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-[#0b1e30] border-b border-white/5 sticky top-0 z-[9999] backdrop-blur-md shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-20">
        
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            {displayAvatar}
          </div>
          <span className="text-xl font-bold tracking-tight text-white transition-colors duration-300">
            Urban<span className="text-blue-400 font-extrabold group-hover:text-blue-300 transition-colors">Move</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <NavLink to="/pricing" className={navLinkClass}>
            Pricing
          </NavLink>
          <NavLink to="/safety" className={navLinkClass}>
            Safety
          </NavLink>
          <NavLink to="/home" className={navLinkClass}>
            Service
          </NavLink>
          <NavLink to="/support" className={navLinkClass}>
            Support
          </NavLink>
        </nav>

        {/* Desktop User Dropdown */}
        <div className="hidden md:flex items-center">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-transparent transition-all duration-300 ${
                profileOpen 
                  ? "bg-white/10 border-white/10" 
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm border-2 border-white/10 shadow-sm">
                {displayAvatar}
              </div>

              <div className="text-left hidden lg:block">
                <p className="text-sm font-semibold text-white leading-none mb-0.5">
                  {displayName}
                </p>
                <p className="text-[11px] font-medium text-slate-400 tracking-wide">
                  Welcome Back
                </p>
              </div>

              <FiChevronDown
                className={`text-slate-400 text-sm transition-transform duration-300 ${
                  profileOpen ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform origin-top-right transition-all duration-300">
                {/* User Info */}
                <div className="px-5 py-4 bg-slate-50/70 border-b border-slate-100">
                  <p className="font-semibold text-slate-800 text-sm">
                    {displayName}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {user?.email || "user@example.com"}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-1.5">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
                  >
                    <FiUser className="text-slate-400 text-base" />
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/account");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
                  >
                    <FiSettings className="text-slate-400 text-base" />
                    <span>Manage Account</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/history");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
                  >
                    <FiClock className="text-slate-400 text-base" />
                    <span>Ride History</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/settings");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
                  >
                    <FiSettings className="text-slate-400 text-base" />
                    <span>Settings</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 bg-slate-50/30">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="text-base" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
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
          {/* User Section */}
          <div className="flex items-center gap-4 pb-5 border-b border-white/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
              {displayAvatar}
            </div>

            <div>
              <p className="text-white font-semibold text-base">
                {displayName}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1.5">
            <NavLink
              to="/pricing"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Pricing
            </NavLink>

            <NavLink
              to="/safety"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Safety
            </NavLink>

            <NavLink
              to="/home"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Service
            </NavLink>

            <NavLink
              to="/support"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Support
            </NavLink>
          </div>

          {/* Mobile Actions Menu */}
          <div className="border-t border-white/10 pt-5 flex flex-col gap-4">
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="text-left text-sm text-slate-300 hover:text-white flex items-center gap-3 py-1 transition-colors"
            >
              <FiUser className="text-slate-400 text-lg" />
              Profile
            </button>

            <button
              onClick={() => {
                navigate("/account");
                setOpen(false);
              }}
              className="text-left text-sm text-slate-300 hover:text-white flex items-center gap-3 py-1 transition-colors"
            >
              <FiSettings className="text-slate-400 text-lg" />
              Manage Account
            </button>

            <button
              onClick={() => {
                navigate("/history");
                setOpen(false);
              }}
              className="text-left text-sm text-slate-300 hover:text-white flex items-center gap-3 py-1 transition-colors"
            >
              <FiClock className="text-slate-400 text-lg" />
              Ride History
            </button>

            <button
              onClick={handleLogout}
              className="text-left text-sm text-red-400 hover:text-red-300 flex items-center gap-3 pt-2 mt-2 border-t border-white/5 transition-colors"
            >
              <FiLogOut className="text-lg" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PrivateHeader;