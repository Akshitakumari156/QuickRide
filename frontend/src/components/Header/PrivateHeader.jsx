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
  `relative text-[#F2F4F5] text-lg font-medium transition-all
   after:absolute after:left-0 after:-bottom-1 after:h-[2px]
   after:bg-white after:transition-all
   ${
     isActive
       ? "after:w-full text-white"
       : "after:w-0 hover:after:w-full"
   }`;

const PrivateHeader = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user, setAuthState } = useAuth();
 const {logout}=useAuth();
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
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
     navigate("/login");

  

  };

  return (
    <header className="w-full bg-[#0F2C46] sticky top-0 z-[9999] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            U
          </div>

          <span className="text-xl font-semibold text-white">
            Urban<span className="text-blue-500">Move</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
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
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {name?.charAt(0)?.toUpperCase() ||
                  user?.firstname?.charAt(0)?.toUpperCase() ||
                  "U"}
              </div>

              <div className="text-left">
                <p className="text-white font-medium leading-tight">
                  {name || user?.firstname || "User"}
                </p>

                <p className="text-xs text-gray-300">
                  Welcome Back
                </p>
              </div>

              <FiChevronDown
                className={`text-white transition-transform duration-300 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border overflow-hidden">
                {/* User Info */}
                <div className="px-5 py-4 bg-gray-50 border-b">
                  <p className="font-semibold text-gray-800">
                    {name || user?.firstname || "User"}
                  </p>

                  <p className="text-sm text-gray-500 truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>

                {/* Menu Items */}
                <button
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  <FiUser />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/account");
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  <FiSettings />
                  <span>Manage Account</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/history");
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  <FiClock />
                  <span>Ride History</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/settings");
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  <FiSettings />
                  <span>Settings</span>
                </button>

                <div className="border-t">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition"
                  >
                    <FiLogOut />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#0F2C46] overflow-hidden transition-all duration-300 ${
          open ? "max-h-screen py-6 px-6" : "max-h-0"
        }`}
      >
        {/* User Section */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {name?.charAt(0)?.toUpperCase() ||
              user?.name?.charAt(0)?.toUpperCase() ||
              "U"}
          </div>

          <div>
            <p className="text-white font-medium">
              {name || user?.name || "User"}
            </p>

            <p className="text-sm text-gray-300">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
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

        {/* Mobile Profile Menu */}
        <div className="border-t border-white/10 mt-6 pt-4 flex flex-col gap-4">
          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="text-left text-white flex items-center gap-2"
          >
            <FiUser />
            Profile
          </button>

          <button
            onClick={() => {
              navigate("/account");
              setOpen(false);
            }}
            className="text-left text-white flex items-center gap-2"
          >
            <FiSettings />
            Manage Account
          </button>

          <button
            onClick={() => {
              navigate("/history");
              setOpen(false);
            }}
            className="text-left text-white flex items-center gap-2"
          >
            <FiClock />
            Ride History
          </button>

          <button
            onClick={handleLogout}
            className="text-left text-red-400 flex items-center gap-2"
          >
            <FiLogOut />
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default PrivateHeader;