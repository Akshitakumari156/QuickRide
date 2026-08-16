import React, { useEffect } from "react";
import Button from "../../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginPopUp = ({ closebackdrop }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const navigate = useNavigate();

  const handleBtn = () => {
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={closebackdrop}
      />

      <div className="relative z-10 w-[28rem] max-w-[90%] bg-white rounded-xl shadow-2xl p-6 flex flex-col gap-6 border border-slate-100">
        <button
          onClick={closebackdrop}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faX} />
        </button>

        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Login Required
          </h2>

          <p className="text-slate-500 font-medium">
            Please login to see ride prices and continue booking.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleBtn}
            label="Continue to Login"
            bg="#2563eb"
            textColor="#FFFFFF"
            hoverbg="#1d4ed8"
            className="w-full h-12 font-semibold shadow-md transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPopUp;