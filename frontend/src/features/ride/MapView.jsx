import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";
import socket from "../../socket/socket";

import userIconImg from "../../assets/user-marker.png";
import driverIconImg from "../../assets/driver-marker.png";

const DEFAULT_CENTER = [22.9734, 78.6569];
const DEFAULT_ZOOM = 5;

const srcIcon = new L.Icon({
  iconUrl: userIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const dstIcon = new L.Icon({
  iconUrl: driverIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const FitBounds = ({ positions }) => {
  const map = useMap();
  const previousPositionsRef = useRef("");

  useEffect(() => {
    if (positions.length > 0) {
      const sig = positions.length.toString();
      if (previousPositionsRef.current !== sig) {
        map.fitBounds(positions, {
          padding: [80, 80],
          maxZoom: 14,
          animate: true,
        });
        previousPositionsRef.current = sig;
      }
    }
  }, [map, positions]);

  return null;
};

const MapView = ({ pickup, dropoff, activeRide, captainLocation }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        
        if (activeRide && socket.connected) {
           socket.emit("user:location:update", {
             lat: position.coords.latitude,
             lng: position.coords.longitude,
             rideId: activeRide._id
           });
        }
      },
      () => setUserLocation(null),
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
      }
    );
    
    return () => navigator.geolocation.clearWatch(watchId);
  }, [activeRide]);

  const positions = [];
  const routePositions = [];

  // Logic for drawing the map and route based on ride status
  if (activeRide && activeRide.status === "ONGOING") {
     if (captainLocation?.lat && captainLocation?.lng) {
        positions.push([captainLocation.lat, captainLocation.lng]);
        routePositions.push([captainLocation.lat, captainLocation.lng]);
     }
     if (dropoff?.lat && dropoff?.lng) {
        positions.push([dropoff.lat, dropoff.lng]);
        routePositions.push([dropoff.lat, dropoff.lng]);
     }
  } else if (activeRide && activeRide.status !== "ONGOING") {
     if (captainLocation?.lat && captainLocation?.lng) {
        positions.push([captainLocation.lat, captainLocation.lng]);
        routePositions.push([captainLocation.lat, captainLocation.lng]);
     }
     if (pickup?.lat && pickup?.lng) {
        positions.push([pickup.lat, pickup.lng]);
        routePositions.push([pickup.lat, pickup.lng]);
     }
  } else {
    // Before active ride (e.g., selecting locations)
    if (pickup?.lat && pickup?.lng) {
      positions.push([pickup.lat, pickup.lng]);
      routePositions.push([pickup.lat, pickup.lng]);
    }
    if (dropoff?.lat && dropoff?.lng) {
      positions.push([dropoff.lat, dropoff.lng]);
      routePositions.push([dropoff.lat, dropoff.lng]);
    }
  }

  const mapCenter =
    positions.length > 0
      ? positions[0]
      : userLocation || DEFAULT_CENTER;

  const mapZoom =
    positions.length > 0
      ? 13
      : userLocation
      ? 14
      : DEFAULT_ZOOM;

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      minZoom={5}
      maxZoom={18}
      zoomControl={true}
      scrollWheelZoom={true}
      style={{
        height: "100%",
        width: "100%",
      }}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution="QuickRide Map"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && (
        <Marker position={userLocation} icon={srcIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {routePositions.length >= 2 && (
        <Polyline
          positions={routePositions}
          pathOptions={{
            color: "#2563eb",
            weight: 5,
            opacity: 0.8,
          }}
        />
      )}

      {(!activeRide || activeRide.status !== "ONGOING") && pickup?.lat && pickup?.lng && (
        <Marker position={[pickup.lat, pickup.lng]} icon={srcIcon}>
          <Popup>{pickup.name || "Pickup"}</Popup>
        </Marker>
      )}

      {(!activeRide || activeRide.status === "ONGOING") && dropoff?.lat && dropoff?.lng && (
        <Marker position={[dropoff.lat, dropoff.lng]} icon={srcIcon}>
          <Popup>{dropoff.name || "Dropoff"}</Popup>
        </Marker>
      )}

      {captainLocation?.lat && captainLocation?.lng && (
        <Marker position={[captainLocation.lat, captainLocation.lng]} icon={dstIcon}>
          <Popup>Captain Location</Popup>
        </Marker>
      )}

      {positions.length > 0 && <FitBounds positions={positions} />}
    </MapContainer>
  );
};

export default MapView;