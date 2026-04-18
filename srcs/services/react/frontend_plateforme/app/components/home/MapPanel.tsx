"use client";

import MapView from "../map/MapView";

export default function MapPanel({ mode, onCreatePoint }) {
  return (
    <div className="h-full w-full">
      <MapView  mode={mode} onCreatePoint={onCreatePoint}/>
    </div>
  );
}