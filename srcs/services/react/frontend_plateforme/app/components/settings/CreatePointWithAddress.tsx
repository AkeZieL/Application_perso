"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


export default function CreatePointWithAddress({ onSubmit, onClose }) {
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [pointType, setPointType] = useState<"place"  | "event" | null>(null);

    const base_url ="https://nominatim.openstreetmap.org/search"

    const handleGeocode = async () => {
        if (!address.trim()) return;

        setLoading(true);

        try {
            const params = new URLSearchParams({
                format: "json",
                addressdetails: "1",
                limit: "1",
                q: address,
            });
            const res = await fetch(`${base_url}?${params.toString()}`, {
                headers: {
                    "Accept-Language": "fr",
                },
                cache: "no-store",
            });
            if (!res.ok) {
                throw new Error(`HTTP error ${res.status}`);
            }
            
            const data = await res.json();

            if (!data.length) {
                alert("Adresse introuvable");
                setLoading(false);
                return;
            }

            const firstResult = data[0];
            if (!pointType) {
                alert("Choisis un type avant de continuer");
                return;
            }
            const coords = {
                latitude: parseFloat(firstResult.lat),
                longitude: parseFloat(firstResult.lon),
                address: firstResult.display_name,
                type: pointType
            };

            onSubmit(coords);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogOverlay className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm" />
        <DialogContent className="sm:max-w-md z-[9999]">
            <DialogHeader>
                <DialogTitle>Entrer une adresse</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ex: 22 rue de la Boite, Lézignan-Corbières"
                    className="border p-2 w-full rounded"
                />

                <div className="flex gap-2">
                    <Button
                    onClick={() => setPointType("place")}
                    variant={pointType === "place" ? "default" : "outline"}
                    className="flex-1"
                    >
                    Lieu
                    </Button>

                    <Button
                    onClick={() => setPointType("event")}
                    variant={pointType === "event" ? "default" : "outline"}
                    className="flex-1"
                    >
                    Évènement
                    </Button>
                </div>
            </div>

            <DialogFooter className="flex flex-col gap-2">
                <Button onClick={handleGeocode} disabled={loading} className="w-full">
                    {loading ? "Recherche..." : "Valider"}
                </Button>

                <Button
                    variant="secondary"
                    onClick={onClose}
                    className="w-full"
                >
                    Annuler
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}