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

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";

// const InputLocation = ({ icon, description, onSelect }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const fetchSuggestions = async (text) => {
//     setQuery(text);

//     if (text.length < 3) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/location/search?q=${text}`
//       );
//       const data = await res.json();
//       setSuggestions(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSelect = (place) => {
//     setQuery(place.display_name);
//     setSuggestions([]);
//     onSelect(place); // send to parent
//   };

//   return (
//     <div className="relative w-full">
//       {/* INPUT */}
//       <div className="flex items-center gap-3 bg-white shadow-md rounded-lg px-4 py-3">
//         <FontAwesomeIcon icon={icon} className="text-gray-500" />

//         <input
//           type="text"
//           placeholder={description}
//           value={query}
//           onChange={(e) => fetchSuggestions(e.target.value)}
//           className="w-full outline-none"
//         />
//       </div>

//       {/* SUGGESTIONS */}
//       {suggestions.length > 0 && (
//         <ul className="absolute z-20 w-full bg-white border rounded-lg mt-1 max-h-60 overflow-y-auto">
//           {suggestions.map((place) => (
//             <li
//               key={place.place_id}
//               onClick={() => handleSelect(place)}
//               className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//             >
//               {place.display_name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default InputLocation;
