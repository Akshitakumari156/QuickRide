import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Dashboard from "./Dashboard";
import RideHistory from "../ride/RideHistory";
import Reviews from "../profile/Reviews";
import ProfileSettings from "../profile/ProfileSettings";

const CaptainHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isOnline, setIsOnline] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("captainToken");
    navigate("/captain/login");
  };

  return (
    <div className="min-h-screen flex bg-[#F4F6FA]">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <Dashboard isOnline={isOnline} setIsOnline={setIsOnline} />
        )}
        {activeTab === "history" && <RideHistory />}
        {activeTab === "reviews" && <Reviews />}
        {activeTab === "profile" && <ProfileSettings />}
      </main>
    </div>
  );
};

export default CaptainHome;
