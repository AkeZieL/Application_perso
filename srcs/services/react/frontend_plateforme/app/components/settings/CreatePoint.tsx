"use client"

import { useState } from "react";

export default function CreatePoint({ mode, onCreatePoint, setMode }) {
  const [address, setAddress] = useState("");

  // 👉 Mode ADDRESS
  const handleAddressSubmit = async () => {
    if (!address) return;

    // exemple avec fetch (géocoding simple)
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
    );
    const data = await res.json();

    if (data.length === 0) return;

    const lat = parseFloat(data[0].lat);
    const lng = parseFloat(data[0].lon);

    onCreatePoint({ lat, lng });

    setMode(null);
    setAddress("");
  };

  return (
    <>
      {/* UI pour mode adresse */}
      {mode === "address" && (
        <div className="modal">
          <h3>Entrer une adresse</h3>

          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ex: Paris"
          />

          <button onClick={handleAddressSubmit}>
            Valider
          </button>

          <button onClick={() => setMode(null)}>
            Annuler
          </button>
        </div>
      )}
    </>
  );
}