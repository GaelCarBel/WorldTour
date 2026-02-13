// src/components/OSMMap.tsx
"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export interface Coordinates {
  lat: number;
  lon: number;
}

// Red marker icon
const redIcon: Icon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function FlyToLocation({ lat, lon, zoom }: { lat: number; lon: number; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], zoom);
  }, [lat, lon, zoom, map]);
  return null;
}

type Props = {
  selected: Coordinates;      // required: city position
  label?: string;             // optional popup label
  zoom?: number;
  width?: string | number;
  height?: string | number;
};

export default function OSMMap({
  selected,
  label,
  zoom = 12,
  width = "100%",
  height = 360,
}: Props) {
  return (
    <MapContainer
      center={[selected.lat, selected.lon]}
      zoom={zoom}
      style={{
        width,
        height,
        borderRadius: "12px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <Marker position={[selected.lat, selected.lon]} icon={redIcon}>
        <Popup>{label ?? `${selected.lat}, ${selected.lon}`}</Popup>
      </Marker>

      <FlyToLocation lat={selected.lat} lon={selected.lon} zoom={zoom} />
    </MapContainer>
  );
}
