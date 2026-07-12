import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import InputLocation from "./InputLocation";
import {
  faLocationDot,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LoginPopUp from "../auth/LoginPopUp";

const RideLocationForm = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const onClickfn = () => {
    const token =
      localStorage.getItem("userToken") || localStorage.getItem("token");

    if (!pickup || !drop) {
      alert("Please select both pickup and drop location");
      return;
    }

    console.log("SRC Address:", pickup.name);
    console.log("SRC Lat:", pickup.lat);
    console.log("SRC Lng:", pickup.lng);

    console.log("DST Address:", drop.name);
    console.log("DST Lat:", drop.lat);
    console.log("DST Lng:", drop.lng);

    if (token) {
      alert("Ride confirmed");
      navigate("/dashboard");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 mt-8 px-3 sm:px-0">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6">
          <div className="grid relative grid-cols-1 md:grid-cols-2 gap-4">
            <InputLocation
              icon={faLocationDot}
              description="Enter Pickup location"
              callback={setPickup}
            />

            <InputLocation
              icon={faLocationCrosshairs}
              description="Enter Drop location"
              callback={setDrop}
            />
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={onClickfn}
              label="Confirm the Ride"
              className="w-full sm:w-3/4 md:w-1/2 rounded-lg py-4 text-lg sm:text-xl font-bold"
            />
          </div>

          {showLogin && (
            <div className="fixed inset-0 z-[100]">
              <LoginPopUp closebackdrop={() => setShowLogin(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideLocationForm;