import React, { useEffect } from "react";
import Button from "../../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faLock } from "@fortawesome/free-solid-svg-icons";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#090d16]/70 backdrop-blur-md transition-opacity"
        onClick={closebackdrop}
      />

      <div className="relative z-10 w-[26rem] max-w-full bg-[#0f172a] text-white rounded-3xl shadow-2xl shadow-black/60 p-7 flex flex-col gap-6 border border-white/15 animate-[toast-in_0.2s_ease-out]">
        <button
          onClick={closebackdrop}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faX} className="text-xs" />
        </button>

        <div className="flex flex-col items-center gap-3 text-center pt-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xl text-white shadow-lg shadow-blue-500/25 border border-white/20">
            <FontAwesomeIcon icon={faLock} />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white font-display">
            Sign In Required
          </h2>

          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
            Please log in or create an account to view instant fare estimates and confirm your captain.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleBtn}
            label="Continue to Sign In"
            bg="#2563eb"
            textColor="#FFFFFF"
            hoverbg="#1d4ed8"
            className="w-full h-12 rounded-xl font-bold shadow-lg shadow-blue-600/30 text-sm tracking-wide"
          />
          <button
            onClick={closebackdrop}
            className="w-full py-2.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopUp;