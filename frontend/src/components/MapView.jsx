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

  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(positions, {
        padding: [80, 80],
        maxZoom: 14,
        animate: true,
      });
    }
  }, [map, positions]);

  return null;
};

const MapView = ({ pickup, dropoff }) => {
  const [userLocation, setUserLocation] = useState(null);

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
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  const positions = [];

  if (pickup?.lat && pickup?.lng) {
    positions.push([pickup.lat, pickup.lng]);
  }

  if (dropoff?.lat && dropoff?.lng) {
    positions.push([dropoff.lat, dropoff.lng]);
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
        attribution="UrbanMove Map"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && !pickup && (
        <Marker position={userLocation} icon={srcIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {positions.length === 2 && (
        <Polyline
          positions={positions}
          pathOptions={{
            color: "#111827",
            weight: 5,
            opacity: 0.8,
          }}
        />
      )}

      {pickup?.lat && pickup?.lng && (
        <Marker position={[pickup.lat, pickup.lng]} icon={srcIcon}>
          <Popup>{pickup.name}</Popup>
        </Marker>
      )}

      {dropoff?.lat && dropoff?.lng && (
        <Marker position={[dropoff.lat, dropoff.lng]} icon={dstIcon}>
          <Popup>{dropoff.name}</Popup>
        </Marker>
      )}

      {positions.length > 0 && <FitBounds positions={positions} />}
    </MapContainer>
  );
};

export default MapView;