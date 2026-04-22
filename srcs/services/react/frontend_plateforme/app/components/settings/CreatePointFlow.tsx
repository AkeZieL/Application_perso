"use client";

import { useState } from "react";
import CreatePointButton from "./CreatePointButton";
import CreatePointWithAddress from "./CreatePointWithAddress"

import formatApiError from "../../lib/utils/formatApiError"
import createPoint from "../../lib/http/point/createPoint"

export default function CreatePointFlow() {
  const [mode, setMode] = useState(null);
  const [error, setError] = useState("");
  

  const closeAll = () => setMode(null);


  const  createFormAddress = async (coords) => {
    console.log("create from address:", coords);
    try {
      const data = await createPoint(coords);
      console.log("CreateFormAdress:", coords);

      closeAll();
    } catch (err: any) {
      const message = formatApiError(err);
      setError(message);
    }
  };

  const createFromMap = (coords) => {
    console.log("create from map:", coords);
    closeAll();
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <CreatePointButton onSelect={setMode} />

      {mode === "address" && (
        <CreatePointWithAddress onSubmit={createFormAddress} onClose={closeAll} />
      )}

    </div>
  );
}