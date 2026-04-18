"use client";

import { useState } from "react";

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
    <div className="modal">
        <h3>Entrer une adresse</h3>

        <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Ex: 22 rue de la Boite, Lézignan-Corbières"
        className="border p-2 w-full"
        />
        <div>
            <button onClick={() => setPointType("place")}>
                Lieu
            </button>
            <button onClick={() => setPointType("event")}>
                Evènement
            </button>
        </div>

        <button onClick={handleGeocode} disabled={loading}>
        {loading ? "Recherche..." : "Valider"}
        </button>
        <hr />
        <button onClick={onClose}>
            Annuler
        </button>
    </div>
  );
}