import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const ScheduleInput = ({ value, onChange }) => {
  return (
    <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-4">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
        Schedule for later{" "}
        <span className="text-slate-500 lowercase font-medium">
          (optional)
        </span>
      </label>

      <div className="relative">
        <FontAwesomeIcon
          icon={faClock}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400 text-sm"
        />

        <input
          type="datetime-local"
          value={value}
          onChange={onChange}
          className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white font-medium transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
    </div>
  );
};

export default ScheduleInput;