"use client"

import { useState } from "react";

export default function CreatePointButton({ onSelect }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleSelect = (mode) => {
    onSelect(mode);      // envoie au parent
    setShowPopup(false); // ferme le popup
  };

  return (
    <>
      <button onClick={() => setShowPopup(true)}>
        Créer un lieu
      </button>

      {showPopup && (
        <div className="modal">
          <h3>Comment créer le lieu ?</h3>

          <button onClick={() => handleSelect("address")}>
            Via adresse
          </button>
          <hr />
          <button onClick={() => handleSelect("map")}>
            En cliquant sur la carte
          </button>
          <hr />
          <button onClick={() => setShowPopup(false)}>
            Annuler
          </button>
        </div>
      )}
    </>
  );
}