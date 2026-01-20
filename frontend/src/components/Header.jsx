import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const navLinkClass = ({ isActive }) =>
  `relative text-[#F2F4F5] text-lg font-medium transition-all
   after:absolute after:left-0 after:-bottom-1 after:h-[2px]
   after:bg-white after:transition-all
   ${isActive ? "after:w-full text-white" : "after:w-0 hover:after:w-full"}`;

const Header = () => {
  const [open, setOpen] = useState(false);
const navigate=useNavigate();
const {isAuth,logout}=useAuth();


  return (
    <header className="w-full bg-[#0F2C46]  top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">

        {/* Logo */}
         <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                            U
                        </div>
                        <span className="text-xl font-semibold text-white">
                            Urban<span className="text-blue-600">Move</span>
                        </span>
                    </div>

                   
                </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink>
          <NavLink to="/safety" className={navLinkClass}>Safety</NavLink>
          <NavLink to="/home" className={navLinkClass}>Service</NavLink>
          <NavLink to="/support" className={navLinkClass}>Support</NavLink>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button
          onClick={()=>{
          if(isAuth){
            logout();
            navigate('/');
          }
          else {
            navigate('/login');
          }
          }}
            label={isAuth?"Logout":"Login"}
            bg="#6C7A89"
            hoverbg="#5A6672"
            textColor="#F2F4F5"
            className="rounded-full px-6"
          />
          <Button
           onClick={()=>{
          if(isAuth){
            navigate('/dashboard');
          }
          else {
            navigate('/register');
          }
          }}
            label={isAuth?"Profile":"Register"}
            bg="#FFFFFF"
            textColor="#0F2C46"
            hoverbg="#E6E8EA"
            className="rounded-full px-6"
          />
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
        className={`md:hidden bg-[#0F2C46] px-6 overflow-hidden transition-all duration-300 ${
          open ? "max-h-screen py-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4">
          <NavLink onClick={() => setOpen(false)} to="/pricing" className={navLinkClass}>Pricing</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/safety" className={navLinkClass}>Safety</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/home" className={navLinkClass}>Service</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/support" className={navLinkClass}>Support</NavLink>

          <div className="pt-4 border-t border-[#1A3B5D] flex flex-col gap-3">
            <Button
            onClick={()=>{
              navigate('/login');
            }}
             label="Login" bg="#6C7A89" hoverbg="#5A6672" textColor="#F2F4F5" />
            <Button
             onClick={()=>{
            navigate('/register')
          }}
             label="Register" bg="#FFFFFF" textColor="#0F2C46" hoverbg="#E6E8EA" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
