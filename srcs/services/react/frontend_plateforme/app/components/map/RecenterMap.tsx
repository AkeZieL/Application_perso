import { useEffect } from "react";
import { useMap } from "react-leaflet";

function RecenterMap({ position }: any) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView([position.latitude, position.longitude], 13);
    }
  }, [position, map]);

  return null;
}

export default RecenterMap