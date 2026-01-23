import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import driverIconImg from "../assets/driver-marker.png";

const captainIcon = new L.Icon({
  iconUrl: driverIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const CaptainMap = ({ coords }) => {
  return (
    <MapContainer
      center={coords || [22.9734, 78.6569]}
      zoom={coords ? 15 : 5}
      className="h-full w-full rounded-xl"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {coords && (
        <Marker position={coords} icon={captainIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default CaptainMap;
