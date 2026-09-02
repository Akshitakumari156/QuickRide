import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import InputLocation from "./InputLocation";
import {
  faLocationDot,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LoginPopUp from "../auth/LoginPopUp";
import { FiNavigation, FiClock, FiPackage, FiCompass, FiShield, FiArrowRight } from "react-icons/fi";

const RideLocationForm = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState("daily");

  const [pickupText, setPickupText] = useState("");
  const [dropText, setDropText] = useState("");

  const quickPicks = [
    { label: "Airport", icon: "✈️", name: "International Airport T3" },
    { label: "Metro Station", icon: "🚇", name: "Central Metro Hub" },
    { label: "Railway Station", icon: "🚆", name: "Central Railway Terminal" },
    { label: "Tech Park", icon: "💼", name: "Cyber City Tech Park" },
    { label: "City Mall", icon: "🛍️", name: "Grand City Mall & Promenade" },
  ];

  const handleQuickPick = (item) => {
    setDropText(item.name);
    setDrop({
      lat: 28.5562,
      lng: 77.1000,
      name: item.name,
      address: item.name,
    });
  };

  const onClickfn = () => {
    const token =
      localStorage.getItem("userToken") || localStorage.getItem("token");

    if (!pickup || !drop) {
      alert("Please select both pickup and drop location");
      return;
    }

    if (token) {
      navigate("/dashboard");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Service Mode Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 border border-white/10 rounded-2xl mb-5 w-full max-w-md overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("daily")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "daily"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <FiNavigation className="text-sm" />
          <span>Daily Ride</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reserve")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "reserve"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <FiClock className="text-sm" />
          <span>Reserve</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("intercity")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "intercity"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <FiCompass className="text-sm" />
          <span>Intercity</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("parcel")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "parcel"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <FiPackage className="text-sm" />
          <span>Courier</span>
        </button>
      </div>

      <div className="w-full">
        {/* Route Inputs with Visual Node Stepper */}
        <div className="relative space-y-3">
          <div className="relative">
            <InputLocation
              icon={faLocationDot}
              description="Enter Pickup location or use current GPS"
              value={pickupText}
              onValueChange={setPickupText}
              callback={setPickup}
            />
          </div>

          <div className="relative">
            <InputLocation
              icon={faFlagCheckered}
              description="Enter Drop destination"
              value={dropText}
              onValueChange={setDropText}
              callback={setDrop}
            />
          </div>
        </div>

        {/* Quick Location Chips */}
        <div className="mt-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>Popular Destinations</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {quickPicks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleQuickPick(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/60 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/10 text-slate-300 hover:text-blue-300 text-xs font-semibold transition-all cursor-pointer"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button & Trust Guarantee */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <FiShield className="text-emerald-400 text-base shrink-0" />
            <span>Upfront Guaranteed Fare • Zero Hidden Charges</span>
          </div>

          <Button
            onClick={onClickfn}
            label="Search Available Captains"
            bg="#2563eb"
            textColor="#ffffff"
            hoverbg="#1d4ed8"
            className="w-full sm:w-auto px-8 h-13 rounded-2xl text-xs sm:text-sm font-bold shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 active:scale-[0.98]"
          />
        </div>

        {showLogin && (
          <div className="fixed inset-0 z-[100]">
            <LoginPopUp closebackdrop={() => setShowLogin(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RideLocationForm;