"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

export default function MapView({ filters }) {
  
  return <LeafletMap filterType={filters.type} filterCategory={filters.categories}/>;
}