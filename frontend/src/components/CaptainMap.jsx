import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import driverIconImg from "../assets/driver-marker.png";

const captainIcon = new L.Icon({
  iconUrl: driverIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const DEFAULT_CENTER = [22.9734, 78.6569]; // India

const CaptainMap = ({ coords }) => {
  // ✅ Convert object → array safely
  const position =
    coords?.lat && coords?.lng
      ? [coords.lat, coords.lng]
      : null;

  return (
    <MapContainer
      center={position || DEFAULT_CENTER}
      zoom={position ? 15 : 5}
      className="h-full w-full rounded-xl"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {position && (
        <Marker position={position} icon={captainIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default CaptainMap;
