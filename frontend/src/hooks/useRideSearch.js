import { useState, useRef, useEffect } from "react";
import socket from "../socket/socket";
import { generateRequestId } from "../utils/requestId";

const getToken = () =>
  localStorage.getItem("userToken") || localStorage.getItem("token");

const baseUrl = import.meta.env.VITE_API_URL || "";

/**
 * Encapsulates the entire "search for a rider" lifecycle:
 *  - kicking off a ride request (with an abortable, request-id-tagged fetch)
 *  - listening for the "ride:accepted" socket event
 *  - cancelling a search in-flight, cancelling a confirmed ride, and
 *    releasing an orphaned request on error/unmount
 *
 * This is a straight extraction of the logic that used to live inline in
 * HomeSidebar — no behavior changes, just modularized so HomeSidebar can
 * stay focused on rendering.
 *
 * @param {object} params
 * @param {object|null} params.pickupCoords
 * @param {object|null} params.dropoffCoords
 * @param {object|null} params.fareData
 * @param {(val: any) => void} params.setFareData
 */
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
  // Tracks the in-flight "search rider" attempt so a cancel click, a
  // component unmount, or a network failure can all clean it up reliably —
  // this is the piece that was missing before and caused orphaned PENDING
  // rides in the DB.
  const activeRequestIdRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Best-effort call that tells the backend "give up on this request id" —
  // it deletes the ride if it already got created, or leaves a short-lived
  // marker so a still-in-flight create call skips writing to the DB at all.
  // Always safe to call even if we don't know whether a ride was actually
  // created yet, and never throws (so it's safe to fire from a catch block
  // or an unmount cleanup without extra try/catch at the call site).
  const releaseRideRequest = async (requestId) => {
    if (!requestId) return;

    try {
      const token = getToken();
      await fetch(`${baseUrl}/api/ride/cancel-by-request/${requestId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // Lets the cleanup call survive even if the page is being
        // navigated away from right as it fires.
        keepalive: true,
      });
    } catch (err) {
      console.error("Failed to release stale ride request:", requestId, err);
    }
  };

  // Safety net: if the consuming component unmounts (user navigates away,
  // closes the tab, etc.) while a search is still in flight, make sure we
  // don't leave an orphaned PENDING ride behind.
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (activeRequestIdRef.current) {
        releaseRideRequest(activeRequestIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // Tag this specific attempt so it can be cleanly cancelled/released no
    // matter how it fails — before this existed, a cancel click or a
    // network error had no way to tell the backend "forget this one",
    // which is exactly what left orphaned PENDING rides in the DB.
    const requestId = generateRequestId();
    activeRequestIdRef.current = requestId;

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

      // The user may have cancelled while we were resolving addresses above.
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
        clientRequestId: requestId,
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

      // The user may have clicked "Cancel Search" in the brief window while
      // this response was on its way back — if so, the cancel handler has
      // already asked the backend to release this requestId (or is about
      // to), so don't resurrect it in the UI as a pending ride.
      if (activeRequestIdRef.current !== requestId) {
        if (data.ride?._id) {
          releaseRideRequest(requestId);
        }
        return;
      }

      setPendingRideId(data.ride?._id || null);
    } catch (err) {
      if (err.name === "AbortError") {
        // Expected when the user cancels or the component unmounts —
        // cleanup already happened at the point of cancellation.
        return;
      }

      console.error("Request Error:", err);
      alert(err.message);
      setSearching(false);
      setPendingRideId(null);

      // We genuinely don't know whether the server received and processed
      // this request before the error happened (e.g. the response was lost
      // to a network drop *after* the ride was already written to Mongo).
      // Always tell the backend to release this requestId just in case —
      // this is the fix for the reported bug: a network/failure error no
      // longer leaves a stray PENDING ride behind.
      releaseRideRequest(requestId);
    } finally {
      if (activeRequestIdRef.current === requestId) {
        activeRequestIdRef.current = null;
        abortControllerRef.current = null;
      }
    }
  };

  const handleCancelSearch = async () => {
    const requestId = activeRequestIdRef.current;

    // Immediately stop listening for the in-flight fetch's response — if it
    // hasn't reached the server yet this also stops it from being sent.
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    activeRequestIdRef.current = null;

    setSearching(false);

    const rideIdToCancel = pendingRideId;
    setPendingRideId(null);

    if (rideIdToCancel) {
      // We already know the real ride _id — cancel it directly.
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
      return;
    }

    // We don't have a ride _id yet, because the create call either hasn't
    // resolved or never will. Release by clientRequestId instead — this
    // deletes the ride if it was already created, or leaves a marker so
    // the in-flight create call skips writing to the DB entirely. This is
    // the case that used to silently leak a PENDING ride.
    if (requestId) {
      await releaseRideRequest(requestId);
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

  // Fired whenever the pickup/drop inputs (or schedule) change — resets any
  // in-progress fare/search state so stale results aren't shown against new
  // locations.
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