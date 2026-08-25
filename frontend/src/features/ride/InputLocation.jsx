import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs, faLocationDot } from "@fortawesome/free-solid-svg-icons";
const InputLocation = ({
  icon,
  description,
  callback,
  onInputChange,

  value = "",
  onValueChange,
}) => {
  const [query, setQuery] = useState(value);
  const [suggestion, setSuggestion] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const wrappedRef = useRef(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        wrappedRef.current &&
        !wrappedRef.current.contains(e.target)
      ) {
        setSuggestion([]);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  const updateQuery = (text) => {
    setQuery(text);

    if (onValueChange) {
      onValueChange(text);
    }
  };

  const fetchSuggestion = async (text) => {
    updateQuery(text);

    if (onInputChange) {
      onInputChange();
    }

    if (!text || text.length < 3) {
      setSuggestion([]);
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "";

      const resp = await fetch(
        `${baseUrl}/api/location/search?q=${encodeURIComponent(text)}`
      );

      const data = await resp.json();

      if (Array.isArray(data)) {
        setSuggestion(data);
      } else {
        setSuggestion([]);
      }
    } catch (err) {
      console.error(err);
      setSuggestion([]);
    }
  };

  const handleSelect = (item) => {
    updateQuery(item.display_name || "");

    setSuggestion([]);
    setIsFocused(false);

    if (onInputChange) {
      onInputChange();
    }

    callback({
      lat: Number(item.lat),
      lng: Number(item.lon),
      name: item.display_name,
      address: item.display_name,
    });
  };

  const [isLocating, setIsLocating] = useState(false);

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    setIsLocating(true);

    const successCallback = (position) => {
      setIsLocating(false);
      updateQuery("Current Location");

      setSuggestion([]);
      setIsFocused(false);

      if (onInputChange) {
        onInputChange();
      }

      callback({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        name: "Current Location",
        address: "Current Location",
      });
    };

    const errorCallback = (err) => {
      console.warn("High accuracy failed, trying low accuracy...", err);
      // Fallback to low accuracy
      navigator.geolocation.getCurrentPosition(
        successCallback,
        (err2) => {
          setIsLocating(false);
          console.error(err2);
          alert("Location permission denied or unavailable.");
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
      );
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const showDropdown =
    isFocused &&
    (suggestion.length > 0 || query.length === 0);

  return (
    <div className="w-full flex justify-center">
      <div
        ref={wrappedRef}
        className="w-full relative max-w-3xl px-4 sm:px-6 py-4"
      >
        <FontAwesomeIcon
          icon={icon || faLocationDot}
          className="absolute left-10 top-1/2 transform -translate-y-1/2 text-[#45574d] text-lg"
        />

        <input
          type="text"
          placeholder={description}
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => fetchSuggestion(e.target.value)}
          className="w-full pl-10 py-3 sm:py-4 rounded-lg border-2 border-gray-300 text-base sm:text-lg placeholder-gray-500"
        />

        {showDropdown && (
          <ul className="absolute z-50 w-full bg-white border rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto">
            <li
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input from losing focus immediately just in case
                handleCurrentLocation();
              }}
              className="px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center gap-2 font-medium border-b text-slate-800"
            >
              {isLocating ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                  Locating...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCrosshairs} className="text-slate-500" />
                  Use current location
                </>
              )}
            </li>

            {suggestion.map((place) => (
              <li
                key={place.place_id || `${place.lat}-${place.lon}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(place);
                }}
                className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-slate-700"
              >
                {place.display_name}
              </li>
            ))}

            {suggestion.length === 0 &&
              query.length >= 3 && (
                <li className="px-4 py-3 text-gray-500">
                  No locations found
                </li>
              )}
          </ul>
        )}
      </div>
    </div>
  );
};
export default InputLocation;