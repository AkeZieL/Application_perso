"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import getNearbyPoint from "@/app/lib/http/point/nearbyPoint"
import parsePoint from "@/app/lib/utils/parsePoint"
import getIcon from "@/app/lib/utils/getIcon"
import { useGeolocation } from "@/app/hooks/useGeolocation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


export default function LeafletMap({ filterType, filterCategory }) {
  const [points, setPoints] = useState<any[]>([]);
  const { position, loading, error } = useGeolocation();
  const [center, setCenter] = useState<[number, number]>([42.8, 2.5]);

useEffect(() => {
    if (loading || error || !position) return;

    setCenter([position.latitude, position.longitude]);

    const fetchNearby = async () => {
      try {
        const params: any = {
          latitude: position.latitude,
          longitude: position.longitude,
          radius: 25,
        };
        if (filterType !== "") {
          params.type = filterType;
        }
        if (filterCategory !== "") {
          params.categories = filterCategory;
        }

        console.log('GET NEARBY POINT WITH PARAM: ', params);
        const data = await getNearbyPoint(params);
        setPoints(data || []);
      } catch (err) {
        console.error("nearby point error:", err);
        setPoints([]);
      }
    };

    fetchNearby();
  }, [position, filterType, filterCategory]);

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