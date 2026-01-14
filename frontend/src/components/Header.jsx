import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "../components/Button";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#0F2C46]">
      <div className="max-w-full mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="h-10 w-10 object-contain" />
          <p className="text-2xl md:text-4xl text-[#F2F4F5] font-semibold">
            UrbanMove
          </p>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/Pricing"><Button label="Pricing" hoverbg="#1A3B5D" hovertextcolor="#FFFFFF" /></Link>
          <Link to="/Safety"><Button label="Safety" hoverbg="#1A3B5D" hovertextcolor="#FFFFFF" /></Link>
          <Link to="/home"><Button label="Service" hoverbg="#1A3B5D" hovertextcolor="#FFFFFF" /></Link>
          <Link to="/Support"><Button label="Support" hoverbg="#1A3B5D" hovertextcolor="#FFFFFF" /></Link>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Button label="Login" bg="#6C7A89" hoverbg="#5A6672" textColor="#F2F4F5" className="rounded-[55px]" />
          <Button label="Register" bg="#6C7A89" hoverbg="#5A6672" textColor="#F2F4F5" className="rounded-[55px]" />
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
      {open && (
        <div className="md:hidden bg-[#0F2C46] px-4 py-4 space-y-3 border-2 rounded-md">
          <Link to="/Pricing" onClick={() => setOpen(false)}>
            <Button label="Pricing" className="w-full my-2" hoverbg="#1A3B5D" hovertextcolor="#FFFFFF" />
          </Link>
          <Link to="/Safety" onClick={() => setOpen(false)}>
            <Button label="Safety" className="w-full my-2" hoverbg="#1A3B5D" hovertextcolor="#FFFFFF" />
          </Link>
          <Link to="/home" onClick={() => setOpen(false)}>
            <Button label="Service" className="w-full my-2" hoverbg="#1A3B5D" hovertextcolor="#FFFFFF" />
          </Link>
          <Link to="/Support" onClick={() => setOpen(false)}>
            <Button label="Support" className="w-full my-2" hoverbg="#1A3B5D" hovertextcolor="#FFFFFF" />
          </Link>

          <div className="pt-2 border-t border-[#1A3B5D]">
            <Button label="Login" className="w-full mb-2" bg="#6C7A89" hoverbg="#5A6672" textColor="#F2F4F5" />
            <Button label="Register" className="w-full" bg="#6C7A89" hoverbg="#5A6672" textColor="#F2F4F5" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
