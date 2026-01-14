import { useNavigate } from "react-router-dom";
import Button from "./Button";
import InputLocation from "./InputLocation";
import {
  faLocationDot,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LoginPopUp from "./LoginPopUp";

const RideLocationForm = () => {
  const navigate = useNavigate();
    const[showLogin,setShowLogin]=useState(false);
  const onClickfn = () => {
    const token = localStorage.getItem("token");
    if(token){
        alert("thanks you are logged in")
    }
    else {
        setShowLogin(true);

    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3   mt-8 px-3 sm:px-0">
      
      {/* locations */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-2 gap-4">
            <InputLocation
              icon={faLocationDot}
              description="Enter Pickup location"
            />
            <InputLocation
              icon={faLocationCrosshairs}
              description="Enter Drop location"
            />
          </div>

          {/* button */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={onClickfn}
              label="Confirm the Ride"
              className="w-full sm:w-3/4 md:w-1/2 rounded-lg py-4 text-lg sm:text-xl font-bold"
            />
           
          </div>
           {showLogin&&<div className="w-full h-full">
           <LoginPopUp closebackdrop={()=>setShowLogin(false)} />
                </div>}
        </div>
      </div>

    </div>
  );
};

export default RideLocationForm;
