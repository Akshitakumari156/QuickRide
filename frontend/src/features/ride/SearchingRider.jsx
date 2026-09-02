import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FiRadio, FiCompass, FiShield } from "react-icons/fi";

const SearchingRider = ({ onCancel }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center w-full p-4 bg-slate-950/90 backdrop-blur-2xl border border-blue-500/30 rounded-3xl shadow-2xl shadow-blue-950/50 animate-[toast-in_0.2s_ease-out] relative overflow-hidden">
      {/* Background ambient radar glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        
        {/* Animated Sonar Rings Header */}
        <div className="relative my-2 flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-full border border-blue-500/30 animate-ping opacity-75 pointer-events-none" />
          <div className="absolute w-20 h-20 rounded-full border border-indigo-500/40 animate-pulse pointer-events-none" />
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-xl shadow-blue-600/40 border border-white/20">
            <FiRadio className="animate-pulse" />
          </div>
        </div>

        <div className="text-center px-2 mt-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            Dispatching Nearest Captain
          </div>

          <h2 className="text-base font-black text-white font-display">
            Broadcasting Real-Time Signal
          </h2>

          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Scanning 8 certified captains within 2.5 km of your location
          </p>
        </div>

        {/* Live scanning telemetry counter */}
        <div className="flex items-center justify-between w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 mt-4 text-xs">
          <span className="text-slate-400 font-medium">Scanning duration</span>
          <span className="text-white font-mono font-bold">{secondsElapsed}s</span>
        </div>

        <div className="flex justify-center mt-3.5">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce shadow-lg shadow-blue-500/50"></span>
            <span
              className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce shadow-lg shadow-indigo-500/50"
              style={{ animationDelay: "0.15s" }}
            ></span>
            <span
              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-lg shadow-cyan-400/50"
              style={{ animationDelay: "0.3s" }}
            ></span>
          </div>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="mt-4 w-full py-2.5 rounded-xl border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500/10 transition-colors cursor-pointer active:scale-[0.98]"
        >
          Cancel Search Request
        </button>
      </div>
    </div>
  );
};

export default SearchingRider;