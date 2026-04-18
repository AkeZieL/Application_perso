"use client";

import CreatePointFlow from "../settings/CreatePointFlow";
import { useState } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export default function SettingsSection() {

  const [filters, setFilters] = useState({
    type: [],
    categories" []
  });
  const toggleFilter = (value, value) => {
    _type = ["lieu", "event"];
    _place = ["restaurant", "hotel"]

    //Verifier la valeur obtenu si c'et un _type ou un _place

    //Faire le bon appel api pour recevoir uniquement les bon truc a
  };

  const isActive = (value) => filters.includes(value);

  return (
    <div>
      <h2 className="font-bold mb-2">Recherche personnalisé</h2>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="lieu">
          <AccordionTrigger onClick={() => toggleFilter("type", "place")}>Lieu</AccordionTrigger>
          <AccordionContent>
            <button 
              onClick={() => toggleFilter("categories", "restaurant")} 
              //className={isActive("restaurant") ? "text-blue-500 font-bold" : ""}>
              >
              Restaurant
            </button>

            <button 
              onClick={() => toggleFilter("categories", "hotel")}
              //className={isActive("hotel") ? "text-blue-500 font-bold" : ""}>
              >
              Hôtel
            </button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="events">
          <AccordionTrigger onClick={() => toggleFilter("event")}>Événements</AccordionTrigger>
          <AccordionContent>
            Festivals<br />
            Concerts<br />
            Sport
          </AccordionContent>
        </AccordionItem>

      </Accordion>
      <CreatePointFlow />
    </div>
  );
}