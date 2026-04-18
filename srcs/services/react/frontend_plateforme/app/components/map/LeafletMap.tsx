"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import api from "@/app/lib/api/axios";
import parsePoint from "@/app/lib/utils/parsePoint"
import getIcon from "@/app/lib/utils/getIcon"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


export default function LeafletMap() {
  const [points, setPoints] = useState<any[]>([]);
  const [center, setCenter] = useState<[number, number]>([42.8, 2.5]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      setCenter([latitude, longitude]);

      const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        radius: "25",
      });
      try {
        const res = await api.get(`point/nearby/?${params.toString()}`);
        console.log("points nearby:", res.data);
        //Affichier point sur carte
        setPoints(res.data);
      } catch (error) {
        console.error("Erreur nearby:", error);
      }
    },
    (err) => {
      console.error("GEO ERROR:", err);
    });
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points.map((p) => {
        const position = parsePoint(p.location);
        if (!center) {
          return <div>Loading map...</div>;
        }
        return (
          <Marker key={p.id} position={position} icon={getIcon(p.type)}>
            <Popup>
              <div>
                <strong>{p.address}</strong>
                <br />
                Type: {p.type}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}