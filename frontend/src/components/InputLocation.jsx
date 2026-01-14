import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const InputLocation = ({ icon, description }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl px-4 sm:px-6 py-4">
        <label className="relative block w-full">
          <FontAwesomeIcon
            icon={icon || faLocationDot}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#45574d] text-lg"
          />
          <input
            type="text"
            placeholder={`${description || "Enter pickup location"}`}
            className="w-full pl-10 py-3 sm:py-4 rounded-lg border-2 border-gray-300 text-base sm:text-lg placeholder-gray-500"
          />
        </label>
      </div>
    </div>
  );
};

export default InputLocation;
