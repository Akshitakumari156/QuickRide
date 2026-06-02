import { useEffect, useRef, useState } from "react";

const LOCATION_INTERVAL = 10000;

const useCaptainLocation = (enabled) => {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("Fetching location...");
  const lastCallRef = useRef(0);
  
  // Cache the last saved coordinates to prevent redundant re-renders from watchPosition ticks
  const prevCoordsRef = useRef({ lat: null, lng: null });

  useEffect(() => {
    if (!enabled) return;
    if (!navigator.geolocation) {
      setAddress("Location not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Only update coordinate state if the coordinates have meaningfully changed (e.g., beyond the 5th decimal place)
        const hasMoved =
          !prevCoordsRef.current.lat ||
          Math.abs(prevCoordsRef.current.lat - lat) > 0.00001 ||
          Math.abs(prevCoordsRef.current.lng - lng) > 0.00001;

        if (hasMoved) {
          const updatedCoords = { lat, lng };
          prevCoordsRef.current = updatedCoords;
          setCoords(updatedCoords);
        }

        // Throttle the reverse geocoding API calls
        const now = Date.now();
        if (now - lastCallRef.current < LOCATION_INTERVAL) return;
        lastCallRef.current = now;

        try {
          // Replaced hardcoded localhost URL string with the environment variable configuration
          const baseUrl = import.meta.env.VITE_API_URL || '';
          const res = await fetch(
            `${baseUrl}/api/location/reverse?lat=${lat}&lng=${lng}`
          );
          const data = await res.json();
          setAddress(data.place || "Unknown location");
        } catch (error) {
          console.error("❌ Error reverse-geocoding coordinates:", error);
          setAddress("Unable to fetch location");
        }
      },
      (error) => {
        console.error("❌ Geolocation error tracking position:", error);
        setAddress("Permission denied");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [enabled]);

  return { coords, address };
};

export default useCaptainLocation;