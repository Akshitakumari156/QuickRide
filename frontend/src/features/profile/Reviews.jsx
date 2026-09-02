import React from "react";
import { FiStar } from "react-icons/fi";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      rating: 5,
      comment: "Very polite and smooth ride. Masterful driving in highway traffic.",
      time: "2 hours ago",
      rider: "Akshita K.",
    },
    {
      id: 2,
      rating: 4,
      comment: "Good driving and clean vehicle air conditioning.",
      time: "Yesterday",
      rider: "Rahul M.",
    },
    {
      id: 3,
      rating: 5,
      comment: "Arrived right on time and chose the fastest shortcut bypass.",
      time: "3 days ago",
      rider: "Vikram S.",
    },
  ];

  return (
    <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-black text-white font-display">Passenger Feedback & Ratings</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Real feedback submitted after verified trip completions</p>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs">
          <span>★</span> 4.9 Lifetime Rating
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-slate-950/50 border border-white/10 rounded-2xl p-4 transition-colors hover:border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold text-sm tracking-widest">
                  {"★".repeat(rev.rating)}
                </span>
                <span className="text-xs text-slate-400 font-medium">• {rev.rider}</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">{rev.time}</span>
            </div>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
