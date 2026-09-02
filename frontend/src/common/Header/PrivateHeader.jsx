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
  FiShield,
  FiDollarSign,
  FiGrid,
  FiHelpCircle
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const navLinkClass = ({ isActive }) =>
  `relative px-3.5 py-1.5 text-sm font-semibold tracking-tight transition-all duration-200 rounded-full
   ${
     isActive
       ? "text-white bg-white/10 shadow-sm border border-white/15"
       : "text-slate-300 hover:text-white hover:bg-white/5"
   }`;

const PrivateHeader = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();
  
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
    <header className="w-full bg-[#090d16]/90 border-b border-white/10 sticky top-0 z-[9999] backdrop-blur-xl shadow-2xl shadow-black/30 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8">
        
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group select-none"
          onClick={() => navigate("/")}
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/25 group-hover:scale-105 group-hover:shadow-blue-500/40 transition-all duration-300 border border-white/20">
            <span>{displayAvatar}</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#090d16]" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white font-display">
            Quick<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-black">Ride</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/70 border border-white/10 backdrop-blur-md">
          <NavLink to="/pricing" className={navLinkClass}>
            Pricing
          </NavLink>
          <NavLink to="/safety" className={navLinkClass}>
            Safety
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            Services
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
              className={`flex items-center gap-3 pl-2 pr-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                profileOpen 
                  ? "bg-white/15 border-white/20 shadow-lg shadow-black/20" 
                  : "bg-slate-900/60 border-white/10 hover:bg-white/10 hover:border-white/15"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs border border-white/20 shadow-sm">
                {displayAvatar}
              </div>

              <div className="text-left hidden lg:block">
                <p className="text-xs font-bold text-white leading-tight">
                  {displayName}
                </p>
                <span className="text-[10px] font-medium text-blue-400 tracking-wide flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              <FiChevronDown
                className={`text-slate-400 text-sm transition-transform duration-300 ${
                  profileOpen ? "rotate-180 text-blue-400" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/60 border border-white/15 overflow-hidden transform origin-top-right transition-all duration-200 z-50">
                {/* User Info Header */}
                <div className="px-5 py-4 bg-white/5 border-b border-white/10">
                  <p className="font-bold text-white text-sm">
                    {displayName}
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-0.5 font-medium">
                    {user?.email || "user@quickride.app"}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="p-2 space-y-0.5">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center text-sm border border-blue-500/20">
                      <FiUser />
                    </div>
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/account");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center text-sm border border-purple-500/20">
                      <FiSettings />
                    </div>
                    <span>Manage Account</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/history");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-sm border border-emerald-500/20">
                      <FiClock />
                    </div>
                    <span>Ride History</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/settings");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-500/20 text-slate-300 flex items-center justify-center text-sm border border-white/10">
                      <FiSettings />
                    </div>
                    <span>App Settings</span>
                  </button>
                </div>

                <div className="p-2 border-t border-white/10 bg-white/[0.02]">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold text-rose-400 hover:bg-rose-500/15 hover:text-rose-300 rounded-xl transition-all cursor-pointer"
                  >
                    <FiLogOut className="text-base shrink-0" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
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
          {/* User Section */}
          <div className="flex items-center gap-4 pb-5 border-b border-white/10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg border border-white/20 shadow-md">
              {displayAvatar}
            </div>

            <div>
              <p className="text-white font-bold text-base">
                {displayName}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {user?.email || "user@quickride.app"}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1.5">
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`
              }
              onClick={() => setOpen(false)}
            >
              Pricing
            </NavLink>

            <NavLink
              to="/safety"
              className={({ isActive }) =>
                `px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`
              }
              onClick={() => setOpen(false)}
            >
              Safety
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`
              }
              onClick={() => setOpen(false)}
            >
              Services
            </NavLink>

            <NavLink
              to="/support"
              className={({ isActive }) =>
                `px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`
              }
              onClick={() => setOpen(false)}
            >
              Support
            </NavLink>
          </div>

          {/* Mobile Actions Menu */}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="text-left text-sm text-slate-300 hover:text-white flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
            >
              <FiUser className="text-blue-400 text-lg" />
              My Profile
            </button>

            <button
              onClick={() => {
                navigate("/account");
                setOpen(false);
              }}
              className="text-left text-sm text-slate-300 hover:text-white flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
            >
              <FiSettings className="text-purple-400 text-lg" />
              Manage Account
            </button>

            <button
              onClick={() => {
                navigate("/history");
                setOpen(false);
              }}
              className="text-left text-sm text-slate-300 hover:text-white flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
            >
              <FiClock className="text-emerald-400 text-lg" />
              Ride History
            </button>

            <button
              onClick={() => {
                navigate("/settings");
                setOpen(false);
              }}
              className="text-left text-sm text-slate-300 hover:text-white flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
            >
              <FiSettings className="text-slate-400 text-lg" />
              App Settings
            </button>

            <button
              onClick={handleLogout}
              className="text-left text-sm font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-3 px-3 py-2.5 rounded-xl mt-2 border-t border-white/10 transition-all"
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