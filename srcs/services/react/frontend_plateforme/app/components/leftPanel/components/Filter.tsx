import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"


export default function Filter({ filters, setFilters }) {
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
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="lieu">
                    <AccordionTrigger onClick={() => toggleType("place")}>Lieu</AccordionTrigger>
                    <AccordionContent>
                        <button onClick={() => updateFilter("category", "Restaurant")}
                            className={filters.category === "Restaurant" ? "font-bold text-blue-600" : ""}
                        >
                            Restaurant
                        </button>
                    </AccordionContent>
                    <AccordionContent>
                        <button onClick={() => updateFilter("category", "Hotel")}
                            className={filters.category === "Hotel" ? "font-bold text-blue-600" : ""}
                        >
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
        </div>
    );
}