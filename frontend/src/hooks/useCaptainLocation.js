import { useEffect, useRef, useState } from "react";
import { reverseGeocode } from "../api/authService";

const LOCATION_INTERVAL = 10000;

const useCaptainLocation = (enabled) => {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("Fetching location...");
  const lastCallRef = useRef(0);
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

        const hasMoved =
          !prevCoordsRef.current.lat ||
          Math.abs(prevCoordsRef.current.lat - lat) > 0.00001 ||
          Math.abs(prevCoordsRef.current.lng - lng) > 0.00001;

        if (hasMoved) {
          const updatedCoords = { lat, lng };
          prevCoordsRef.current = updatedCoords;
          setCoords(updatedCoords);
        }

        const now = Date.now();
        if (now - lastCallRef.current < LOCATION_INTERVAL) return;
        lastCallRef.current = now;

        try {
          const { data } = await reverseGeocode(lat, lng);
          setAddress(data.place || "Unknown location");
        } catch (error) {
          console.error("Error reverse-geocoding coordinates:", error);
          setAddress("Unable to fetch location");
        }
      },
      (error) => {
        console.error("Geolocation error tracking position:", error);
        setAddress("Permission denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [enabled]);

  return { coords, address };
};

export default useCaptainLocation;