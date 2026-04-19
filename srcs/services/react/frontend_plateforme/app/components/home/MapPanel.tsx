"use client";

import MapView from "../map/MapView";

export default function MapPanel({ mode, filters, onCreatePoint }) {
  return (
    <div className="h-full w-full">
      <MapView  mode={mode}  filters={filters} onCreatePoint={onCreatePoint}/>
    </div>
  );
}