import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const SearchingRider = ({ onCancel }) => {
  return (
    <div className="flex items-center justify-center h-full mt-2 px-1">
      <div className=" rounded-3xl w-full max-w-md p-1">

        <div className="flex justify-center">
          <DotLottieReact
            src="https://lottie.host/e3de29a6-4002-4eae-b1a8-bb742da3e8b1/OkQft25709.lottie"
            loop
            autoplay
            className="w-64 h-64"
          />
        </div>

       <div className="px-4 -mt-20">
         <h2 className="text-2xl font-bold text-center text-gray-900">
          Searching for a Rider
        </h2>

        <p className="text-center text-gray-500 mt-2">
          We're finding the nearest available captain for your ride.
        </p>
       </div>

        <div className="flex justify-center mt-5">
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-black rounded-full animate-bounce"></span>
            <span
              className="w-3 h-3 bg-black rounded-full animate-bounce"
              style={{ animationDelay: "0.15s" }}
            ></span>
            <span
              className="w-3 h-3 bg-black rounded-full animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></span>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="mt-8 w-full py-2 rounded-xl border border-red-500 text-red-500 font-semibold hover:bg-red-50 transition"
        >
          Cancel Search
        </button>
      </div>
    </div>
  );
};

export default SearchingRider;