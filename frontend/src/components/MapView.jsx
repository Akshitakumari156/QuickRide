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
import { useEffect, useState } from "react";

import userIconImg from "../assets/user-marker.png";
import driverIconImg from "../assets/driver-marker.png";

/* =========================
   CONFIG
========================= */

const DEFAULT_CENTER = [22.9734, 78.6569]; // India
const DEFAULT_ZOOM = 5;

/* =========================
   ICONS
========================= */

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

/* =========================
   AUTO FIT BOUNDS
========================= */

const FitBounds = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(positions, {
        padding: [50, 50],
        maxZoom: 15,
      });
    }
  }, [map, positions]);

  return null;
};

/* =========================
   MAP VIEW
========================= */

const MapView = ({ pickup, dropoff }) => {
  const [userLocation, setUserLocation] = useState(null);

  /* Get user's current location */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      () => setUserLocation(null),
      { enableHighAccuracy: true }
    );
  }, []);

  /* Build positions safely */
  const positions = [];

  if (pickup?.lat && pickup?.lng) {
    positions.push([pickup.lat, pickup.lng]);
  }

  if (dropoff?.lat && dropoff?.lng) {
    positions.push([dropoff.lat, dropoff.lng]);
  }

  /* Map center & zoom */
  const mapCenter =
    positions.length > 0
      ? positions[0]
      : userLocation || DEFAULT_CENTER;

  const mapZoom =
    positions.length > 0 ? 13 : userLocation ? 14 : DEFAULT_ZOOM;

  return (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      center={mapCenter}
      zoom={mapZoom}
    >
      <TileLayer
        attribution="UrbanMove Map"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User current location */}
      {userLocation && !pickup && (
        <Marker position={userLocation} icon={srcIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* Route */}
      {positions.length === 2 && (
        <Polyline positions={positions} />
      )}

      {/* Pickup marker */}
      {pickup?.lat && pickup?.lng && (
        <Marker position={[pickup.lat, pickup.lng]} icon={srcIcon}>
          <Popup>{pickup.name}</Popup>
        </Marker>
      )}

      {/* Dropoff marker */}
      {dropoff?.lat && dropoff?.lng && (
        <Marker position={[dropoff.lat, dropoff.lng]} icon={dstIcon}>
          <Popup>{dropoff.name}</Popup>
        </Marker>
      )}

      {/* Auto zoom */}
      {positions.length > 0 && (
        <FitBounds positions={positions} />
      )}
    </MapContainer>
  );
};

export default MapView;
