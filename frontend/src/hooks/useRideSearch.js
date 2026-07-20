import { useState, useRef, useEffect } from "react";
import socket from "../socket/socket";

const getToken = () =>
  localStorage.getItem("userToken") || localStorage.getItem("token");

const baseUrl = import.meta.env.VITE_API_URL || "";

export default function useRideSearch({
  pickupCoords,
  dropoffCoords,
  fareData,
  setFareData,
}) {
  const [searching, setSearching] = useState(false);
  const [activeRide, setActiveRide] = useState(null);
  const [pendingRideId, setPendingRideId] = useState(null);
  const [existingRide, setExistingRide] = useState(null);

  const abortControllerRef = useRef(null);

  // Clean up in-flight requests on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Socket listener for accepted ride
  useEffect(() => {
    const handleRideAccepted = (payload) => {
      console.log("RIDE ACCEPTED by captain:", payload);

      setSearching(false);
      setPendingRideId(null);
      setActiveRide(payload.ride);
    };

    socket.on("ride:accepted", handleRideAccepted);

    return () => {
      socket.off("ride:accepted", handleRideAccepted);
    };
  }, []);

  // Fetch active or pending ride state on initial render
  useEffect(() => {
    const fetchExistingRide = async () => {
      try {
        const token = getToken();

        const res = await fetch(`${baseUrl}/api/ride/active`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;

        const data = await res.json();

        console.log("Active Ride:", data);

        if (!data.success || !data.ride) return;

        if (data.ride.status === "PENDING") {
          setExistingRide(data.ride);
        } else if (
          data.ride.status === "ACCEPTED" ||
          data.ride.status === "ONGOING"
        ) {
          setActiveRide(data.ride);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchExistingRide();
  }, []);

  const resolveLocationAddress = async (coords, defaultLabel) => {
    if (!coords) return defaultLabel;

    if (
      coords.address &&
      typeof coords.address === "string" &&
      !coords.address.startsWith("Selected")
    ) {
      return coords.address;
    }

    if (coords.lat && coords.lng) {
      try {
        console.log(
          `Resolving GPS coordinates to address: [Lat: ${coords.lat}, Lng: ${coords.lng}]`
        );

        const res = await fetch(
          `${baseUrl}/api/location/reverse?lat=${coords.lat}&lng=${coords.lng}`
        );

        if (res.ok) {
          const data = await res.json();

          if (data && data.place) {
            return data.place;
          }
        }
      } catch (err) {
        console.error(
          "Local geocoder pipeline bypass or network block:",
          err.message
        );
      }

      return `${Number(coords.lat).toFixed(4)}, ${Number(coords.lng).toFixed(
        4
      )}`;
    }

    return defaultLabel;
  };

  const clearExistingRide = () => {
    setExistingRide(null);
  };

  const handleStartNewRide = async () => {
    if (!existingRide) return;

    try {
      const token = getToken();

      const res = await fetch(
        `${baseUrl}/api/ride/cancel/${existingRide._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to cancel existing ride");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setExistingRide(null);
      setSearching(false);
      setPendingRideId(null);
    }
  };

  const handleConfirmRide = async () => {
    console.log("Confirm Ride clicked");

    if (!pickupCoords || !dropoffCoords || !fareData) {
      console.warn("Cannot request ride. Missing required position metrics:", {
        pickupCoords,
        dropoffCoords,
        fareData,
      });

      alert("Please select both locations and calculate the fare price first.");
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setSearching(true);
      setPendingRideId(null);

      const token = getToken();

      const finalPickupAddress = await resolveLocationAddress(
        pickupCoords,
        "Selected Pickup Point"
      );

      const finalDestinationAddress = await resolveLocationAddress(
        dropoffCoords,
        "Selected Target Destination"
      );

      if (controller.signal.aborted) {
        return;
      }

      const requestPayload = {
        pickup: {
          lat: Number(pickupCoords.lat),
          lng: Number(pickupCoords.lng),
          address: finalPickupAddress,
        },
        destination: {
          lat: Number(dropoffCoords.lat),
          lng: Number(dropoffCoords.lng),
          address: finalDestinationAddress,
        },
      };
      console.log("Dispatched payload to backend matching engine:", requestPayload);

      const res = await fetch(`${baseUrl}/api/ride/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestPayload),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend Error Output:", errorText);

        if (
          errorText.startsWith("<!DOCTYPE") ||
          errorText.startsWith("<html")
        ) {
          throw new Error(
            `Backend Server Error (${res.status}). Open your Node.js backend terminal log immediately to look at the error trace!`
          );
        }

        const errorJson = JSON.parse(errorText);
        throw new Error(
          errorJson.message || "Failed to process ride allocation request."
        );
      }

      const data = await res.json();
      console.log("Ride tracking sequence created successfully:", data);

      setPendingRideId(data.ride?._id || null);
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      }

      console.error("Request Error:", err);
      alert(err.message);
      setSearching(false);
      setPendingRideId(null);
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleCancelSearch = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setSearching(false);

    const rideIdToCancel = pendingRideId;
    setPendingRideId(null);

    if (rideIdToCancel) {
      try {
        const token = getToken();
        const res = await fetch(
          `${baseUrl}/api/ride/cancel/${rideIdToCancel}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Cancel search failed:", errorText);
        }
      } catch (err) {
        console.error("Cancel search error:", err);
      }
    }
  };

  const handleCancelRide = async () => {
    if (!activeRide) return;

    console.log("Cancelling ride:", activeRide._id);

    try {
      const token = getToken();

      const res = await fetch(`${baseUrl}/api/ride/cancel/${activeRide._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setActiveRide(null);
        setFareData(null);
        alert("Ride cancelled successfully");
      } else {
        alert("Failed to cancel ride");
      }
    } catch (err) {
      console.error("Cancel Error:", err);
      alert("Error cancelling ride: " + err.message);
    }
  };

  const handleLocationInputChange = () => {
    if (setFareData) {
      setFareData(null);
    }
    setSearching(false);
    setPendingRideId(null);
  };

  return {
    searching,
    activeRide,
    existingRide,
    pendingRideId,

    handleConfirmRide,
    handleCancelSearch,
    handleCancelRide,
    handleStartNewRide,
    handleLocationInputChange,
    clearExistingRide,
  };
}