import { useEffect, useRef, useState } from "react";

const LOCATION_INTERVAL = 10000; // 10 seconds

const useCaptainLocation = (captainId) => {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("Fetching location...");
  const lastCallRef = useRef(0);

  useEffect(() => {
    if (!navigator.geolocation) {
      setAddress("Location not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setCoords([lat, lng]);

        const now = Date.now();
        if (now - lastCallRef.current < LOCATION_INTERVAL) {
          return; // ⛔ throttle backend calls
        }
        lastCallRef.current = now;

        try {
          const res = await fetch(
            `http://localhost:5000/api/location/reverse?lat=${lat}&lng=${lng}&captainId=${captainId}`
          );

          console.log("Frontend status:", res.status);

          const data = await res.json();
          console.log("Frontend data:", data);

          setAddress(data.place || "Unknown location");




          setAddress(data.place || "Unknown location");
        } catch {
          setAddress("Unable to fetch location");
        }
      },
      () => setAddress("Permission denied"),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [captainId]);

  return { coords, address };
};

export default useCaptainLocation;
