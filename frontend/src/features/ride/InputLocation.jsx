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
    <div className="w-full relative" ref={wrappedRef}>
      <div className="relative flex items-center">
        <div className="absolute left-3.5 flex items-center pointer-events-none text-blue-400 text-sm">
          <FontAwesomeIcon icon={icon || faLocationDot} />
        </div>

        <input
          type="text"
          placeholder={description}
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => fetchSuggestion(e.target.value)}
          className="w-full h-12 sm:h-13 pl-10 pr-4 rounded-2xl border border-white/15 bg-slate-950/60 text-white placeholder-slate-400 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-900"
        />
      </div>

      {showDropdown && (
        <ul className="absolute left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-2xl border border-white/15 rounded-2xl mt-2 shadow-2xl max-h-60 overflow-y-auto overflow-x-hidden p-1.5 space-y-1 animate-[toast-in_0.15s_ease-out]">
          <li
            onMouseDown={(e) => {
              e.preventDefault();
              handleCurrentLocation();
            }}
            className="px-3.5 py-2.5 rounded-xl cursor-pointer hover:bg-blue-600/20 text-blue-400 flex items-center gap-2.5 text-xs sm:text-sm font-bold border-b border-white/10 transition-colors"
          >
            {isLocating ? (
              <>
                <span className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                <span>Locating your coordinates...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCrosshairs} className="text-blue-400 text-sm" />
                <span>Use my current GPS location</span>
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
              className="px-3.5 py-2 rounded-xl cursor-pointer hover:bg-white/10 text-slate-200 text-xs sm:text-sm font-medium transition-colors line-clamp-2"
            >
              {place.display_name}
            </li>
          ))}

          {suggestion.length === 0 && query.length >= 3 && (
            <li className="px-3.5 py-2.5 text-slate-400 text-xs text-center">
              No matching locations found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default InputLocation;