import { useEffect, useRef, useState } from "react";

const LOCATION_INTERVAL = 10000;

const useCaptainLocation = (enabled) => {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("Fetching location...");
  const lastCallRef = useRef(0);

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

        // ✅ OBJECT — NOT ARRAY
        setCoords({ lat, lng });

        const now = Date.now();
        if (now - lastCallRef.current < LOCATION_INTERVAL) return;
        lastCallRef.current = now;

        try {
          const res = await fetch(
            `http://localhost:5000/api/location/reverse?lat=${lat}&lng=${lng}`
          );
          const data = await res.json();
          setAddress(data.place || "Unknown location");
        } catch {
          setAddress("Unable to fetch location");
        }
      },
      () => setAddress("Permission denied"),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [enabled]);

  return { coords, address };
};

export default useCaptainLocation;
