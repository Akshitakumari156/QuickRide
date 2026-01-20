import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const InputLocation = ({ icon, description, callback }) => {
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const wrapedref = useRef(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    const clickOutside = (e) => {
      if (wrapedref.current && !wrapedref.current.contains(e.target)) {
        setSuggestion([]);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  /* Fetch suggestions */
  const fetchsuggestion = async (text) => {
    setQuery(text);

    if (text.length < 3) {
      setSuggestion([]);
      return;
    }

    try {
      const resp = await fetch(
        `http://localhost:5000/api/location/search?q=${text}`
      );
      const data = await resp.json();
      setSuggestion(data);
    } catch (error) {
      console.log("error in fetching location");
    }
  };

  /* Select searched place */
  const handleSelect = (item) => {
    setQuery(item.display_name);
    setSuggestion([]);
    setIsFocused(false);

    callback({
      lat: Number(item.lat),
      lon: Number(item.lon),
      name: item.display_name,
    });
  };

  /* Select current location */
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setQuery("Current location");
        setSuggestion([]);
        setIsFocused(false);

        callback({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          name: "Current location",
        });
      },
      () => alert("Location permission denied"),
      { enableHighAccuracy: true }
    );
  };

  const showDropdown =
    isFocused && (suggestion.length > 0 || query.length === 0);

  return (
    <div className="w-full flex justify-center">
      <div
        ref={wrapedref}
        className="w-full relative max-w-3xl px-4 sm:px-6 py-4"
      >
        <FontAwesomeIcon
          icon={icon || faLocationDot}
          className="absolute left-10 top-1/2 transform -translate-y-1/2 text-[#45574d] text-lg"
        />

        <input
          type="text"
          placeholder={description || "Enter pickup location"}
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => fetchsuggestion(e.target.value)}
          className="w-full pl-10 py-3 sm:py-4 rounded-lg border-2 border-gray-300 text-base sm:text-lg placeholder-gray-500"
        />

        {/* Dropdown */}
        {showDropdown && (
          <ul className="absolute z-50 w-full bg-white border rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto">
            {/* Current location */}
            <li
              onClick={handleCurrentLocation}
              className="px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center gap-2 font-medium border-b"
            >
              <FontAwesomeIcon icon={faCrosshairs} />
              Use current location
            </li>

            {/* Search results */}
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
