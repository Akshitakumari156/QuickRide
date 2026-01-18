import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const InputLocation = ({ icon, description, callback }) => {
  const [query, setQuery] = useState("");
  const wrapedref=useRef(null);
  const [suggestion, setSuggestion] = useState([]);
  useEffect(()=>{
      const clickOutside=(e)=>{
        if(wrapedref&&!wrapedref.current.contains(e.target)){
          setSuggestion([])
        }
      }
      document.addEventListener("mousedown",clickOutside);
      return ()=>{
        document.removeEventListener("mousedown",clickOutside)
      }
  },[])
  const fetchsuggestion = async (text) => {
    setQuery(text);
    if (text.length < 3) {
      setSuggestion([]);
      return;
    }
    try {
      const resp = await fetch(`http://localhost:5000/api/location/search?q=${text}`);
      console.log("FETCH HIT");
console.log("STATUS:", resp.status);
      const data = await resp.json();
      console.log("DATA FROM API:", data);
      setSuggestion(data);
    

    } catch (error) {
      console.log("error in fetching location");

    }
  }
  const handleSelect = (place) => {
    setQuery(place.display_name);
    setSuggestion([]);
    callback(place);
  }
  return (
    <div className="w-full flex justify-center">
      <div
      ref={wrapedref}
       className="w-full relative max-w-3xl px-4 sm:px-6 py-4">
    
          <FontAwesomeIcon
            icon={icon || faLocationDot}
            className="absolute left-10 top-1/2 transform -translate-y-1/2 text-[#45574d] text-lg"
          />
          <input
            type="text"
            placeholder={`${description || "Enter pickup location"}`}
            onChange={(e) => {
              fetchsuggestion(e.target.value);
            }}
            value={query}
            className="w-full pl-10 py-3 sm:py-4 rounded-lg border-2 border-gray-300 text-base sm:text-lg placeholder-gray-500"
          />

          {suggestion.length > 0 && (
            <ul className="absolute z-20 w-full bg-white border rounded-lg mt-1 max-h-60 overflow-y-auto">
              {suggestion.map((place) => (
                <li
                  key={place.place_id}
                  onClick={() => handleSelect(place)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};

export default InputLocation;
