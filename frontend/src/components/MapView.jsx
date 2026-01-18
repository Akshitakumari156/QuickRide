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

const userLocation = {
  lat: 31.7685759,
  lon: 74.8315603,
};

const driverLocation = {
  lat: 25.1737019,
  lon: 75.8574194,
};

const userIcon = new L.Icon({
  iconUrl: userIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const driverIcon = new L.Icon({
  iconUrl: driverIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const FitBounds = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(positions, { padding: [50, 50] });
  }, [map, positions]);

  return null;
};

const MapView = () => {
  const positions = [
    [userLocation.lat, userLocation.lon],
    [driverLocation.lat, driverLocation.lon],
  ];

  return (
    <MapContainer style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline positions={positions} />

      <Marker position={positions[0]} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      <Marker position={positions[1]} icon={driverIcon}>
        <Popup>Driver</Popup>
      </Marker>

      <FitBounds positions={positions} />
    </MapContainer>
  );
};

export default MapView;
