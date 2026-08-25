import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

import driverIconImg from "../../assets/driver-marker.png";
import userIconImg from "../../assets/user-marker.png";

const captainIcon = new L.Icon({
  iconUrl: driverIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const userIcon = new L.Icon({
  iconUrl: userIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const DEFAULT_CENTER = [22.9734, 78.6569]; 

const FitBounds = ({ positions }) => {
  const map = useMap();
  const previousPositionsRef = useRef("");

  useEffect(() => {
    if (positions.length > 0) {
      // Create a signature so it doesn't auto-fit on micro-movements, only on major state changes (like adding a new point)
      const sig = positions.length.toString();
      if (previousPositionsRef.current !== sig) {
        map.fitBounds(positions, {
          padding: [80, 80],
          maxZoom: 15,
          animate: true,
        });
        previousPositionsRef.current = sig;
      }
    }
  }, [map, positions]);

  return null;
};

const CaptainMap = ({ coords, activeTrip, userLiveLocation }) => {
  const position = coords?.lat && coords?.lng ? [coords.lat, coords.lng] : null;

  const positions = [];
  if (position) positions.push(position);

  if (userLiveLocation?.lat && userLiveLocation?.lng) {
    positions.push([userLiveLocation.lat, userLiveLocation.lng]);
  }

  let pickupCoords = null;
  let destinationCoords = null;
  
  if (activeTrip) {
    if (activeTrip.pickup?.lat && activeTrip.pickup?.lng) {
      pickupCoords = [activeTrip.pickup.lat, activeTrip.pickup.lng];
      if (activeTrip.status !== "ONGOING") {
        positions.push(pickupCoords);
      }
    }
    if (activeTrip.destination?.lat && activeTrip.destination?.lng) {
      destinationCoords = [activeTrip.destination.lat, activeTrip.destination.lng];
      if (activeTrip.status === "ONGOING") {
         positions.push(destinationCoords);
      }
    }
  }

  // Draw polyline connecting positions
  const routePositions = [];
  if (position) routePositions.push(position);
  
  if (activeTrip && activeTrip.status === "ONGOING") {
    // If the user's live location is known and we're ongoing, draw line from captain to user (who is in the car) and then to destination? 
    // Actually, captain and user are in the SAME car. So captain -> destination is fine.
    if (destinationCoords) routePositions.push(destinationCoords);
  } else if (activeTrip && activeTrip.status !== "ONGOING") {
    if (userLiveLocation?.lat && userLiveLocation?.lng) {
      routePositions.push([userLiveLocation.lat, userLiveLocation.lng]);
    } else if (pickupCoords) {
      routePositions.push(pickupCoords);
    }
  }

  return (
    <MapContainer
      center={position || DEFAULT_CENTER}
      zoom={position ? 15 : 5}
      className="h-full w-full rounded-xl z-0 relative"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {position && (
        <Marker position={position} icon={captainIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {userLiveLocation?.lat && userLiveLocation?.lng && (
        <Marker position={[userLiveLocation.lat, userLiveLocation.lng]} icon={userIcon}>
          <Popup>Rider Live Location</Popup>
        </Marker>
      )}

      {activeTrip && pickupCoords && activeTrip.status !== "ONGOING" && (!userLiveLocation) && (
        <Marker position={pickupCoords} icon={userIcon}>
          <Popup>Rider Pickup Target</Popup>
        </Marker>
      )}

      {activeTrip && destinationCoords && activeTrip.status === "ONGOING" && (
        <Marker position={destinationCoords} icon={userIcon}>
          <Popup>Rider Destination</Popup>
        </Marker>
      )}

      {routePositions.length > 1 && (
        <Polyline
          positions={routePositions}
          pathOptions={{ color: "#2563eb", weight: 5, opacity: 0.8 }}
        />
      )}

      {positions.length > 0 && <FitBounds positions={positions} />}
    </MapContainer>
  );
};

export default CaptainMap;
