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
import { useEffect } from "react";

import userIconImg from "../assets/user-marker.png";
import driverIconImg from "../assets/driver-marker.png";

// Dummy Source & Destination
const SRC_LOCATION = {
  lat: 31.7685759,
  lon: 74.8315603,
};

const DST_LOCATION = {
  lat: 25.1737019,
  lon: 75.8574194,
};

// Source marker
const srcIcon = new L.Icon({
  iconUrl: userIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Destination marker
const dstIcon = new L.Icon({
  iconUrl: driverIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Auto-fit bounds
const FitBounds = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(positions, {
      padding: [50, 50],
      maxZoom: 15,
    });
  }, [map, positions]);

  return null;
};

const MapView = () => {
  const src = [SRC_LOCATION.lat, SRC_LOCATION.lon];
  const dst = [DST_LOCATION.lat, DST_LOCATION.lon];
  const positions = [src, dst];

  return (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      center={src}   // initial center (will be overridden by fitBounds)
      zoom={5}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Line between src & dst */}
      <Polyline positions={positions} />

      {/* Source Marker */}
      <Marker position={src} icon={srcIcon}>
        <Popup>Source</Popup>
      </Marker>

      {/* Destination Marker */}
      <Marker position={dst} icon={dstIcon}>
        <Popup>Destination</Popup>
      </Marker>

      <FitBounds positions={positions} />
    </MapContainer>
  );
};

export default MapView;
