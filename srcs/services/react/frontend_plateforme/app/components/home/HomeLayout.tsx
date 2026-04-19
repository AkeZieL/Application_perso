"use client";

import LeftPanel from "./LeftPanel";
import MapPanel from "./MapPanel";
import { useState } from "react";


export default function HomeLayout() {
    const [mode, setMode] = useState<"map" | "address" | null>(null);
    const [filters, setFilters] = useState({
    type: "",
    categories: "",
  });

    const handleCreatePoint = (data: any) => {
        console.log("CREATE POINT:", data);
    };
    return (
        <div className="grid grid-cols-3 h-screen">
            <section className="col-span-1 overflow-auto border-r p-4">
                <LeftPanel mode={mode} filters={filters} setFilters={setFilters} setMode={setMode} />
            </section>
            
            <section className="col-span-2 h-full">
                <MapPanel mode={mode} filters={filters} onCreatePoint={handleCreatePoint}/>
            </section>
        </div>
    );
}