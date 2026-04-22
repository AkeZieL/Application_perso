"use client";

import CreatePointFlow from "../settings/CreatePointFlow";
import { useGeolocation } from "@/app/hooks/useGeolocation";
import { useState, useEffect } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export default function SettingsSection({ filters, setFilters }) {

  const updateFilter = (key: "type" | "category", value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleType = (newType: string) => {
    setFilters((prev) => ({
      ...prev,
      type: prev.type === newType ? null : newType,
      // On réinitialise la catégorie quand on change de type (recommandé)
      category: prev.type === newType ? prev.category : null,
    }));
  };
  return (
    <div>
      <h2 className="font-bold mb-2">Recherche personnalisé</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="lieu">
          <AccordionTrigger onClick={() => toggleType("place")}>Lieu</AccordionTrigger>
          <AccordionContent>
            <button 
              onClick={() => updateFilter("category", "restaurant")}
              className={filters.category === "restaurant" ? "font-bold text-blue-600" : ""}
              >
              Restaurant
            </button>
          </AccordionContent>
          <AccordionContent>
            <button onClick={() => updateFilter("category", "hotel")}>
              Hôtel
            </button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="events">
          <AccordionTrigger onClick={() => toggleType("event")}>Événements</AccordionTrigger>
          <AccordionContent>
            Festivals<br />
            Concerts<br />
            Sport
          </AccordionContent>
        </AccordionItem>

      </Accordion>
      <CreatePointFlow />
      <hr />
    </div>
  );
}