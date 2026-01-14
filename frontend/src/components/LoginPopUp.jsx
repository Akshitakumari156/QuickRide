import React, { useEffect } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const LoginPopUp = ({ closebackdrop }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const navigate=useNavigate();
  const handleBtn=()=>{
    navigate('/login')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-[#0F2C46]/40 backdrop-blur-sm"
        onClick={closebackdrop}
      />

      {/* MODAL */}
      <div className="relative z-10 w-[28rem] max-w-[90%] bg-[#F2F4F5] rounded-xl shadow-2xl p-6 flex flex-col gap-6">

        {/* CLOSE ICON */}
        <button
          onClick={closebackdrop}
          className="absolute top-3 right-3 text-[#6C7A89] hover:text-[#0F2C46]"
        >
          <FontAwesomeIcon icon={faX} />
        </button>

        {/* CONTENT */}
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-bold text-[#0F2C46]">
            Login Required
          </h2>
          <p className="text-[#6C7A89]">
            Please login to see ride prices and continue booking.
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
          onClick={handleBtn}
            label="Continue to Login"
            bg="#2ECC71"
            textColor="#0F2C46"
            className="w-full h-12 font-semibold"
            hoverbg="#3ABEFF"
          />
        </div>

      </div>
    </div>
  );
};

export default LoginPopUp;
