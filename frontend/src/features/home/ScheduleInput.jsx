import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const ScheduleInput = ({ value, onChange }) => {
  return (
    <div className="bg-slate-50/60 border border-slate-100 rounded-xl p-4">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
        Schedule ride{" "}
        <span className="text-slate-400 lowercase font-normal">
          (optional)
        </span>
      </label>

      <div className="relative">
        <FontAwesomeIcon
          icon={faClock}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
        />

        <input
          type="datetime-local"
          value={value}
          onChange={onChange}
          className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-800 font-medium transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>
    </div>
  );
};

export default ScheduleInput;