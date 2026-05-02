"use client";

import { useState } from "react";

import getGeoPosWithAdresse from "@/app/lib/http/getGeoPosWithAdresse";
import createEtablishment from "@/app/lib/http/etablissement/createEtablishment";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";


export default function CreateEstablishment({ setEstablishments }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("other");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setError("");

    if (!name.trim() || !address.trim()) {
      setError("Nom et adresse sont obligatoires");
      return;
    }

    let coords;
    try {
      coords = await getGeoPosWithAdresse(address);
    } catch (error) {
      console.log('Error Get geo-position with adresse: ', error)
      return ;
    }

    if (!coords) {
      console.log("Adresse non trouvé");
      setError("Adresse introuvable, essayez une autre adresse");
      return;
    }
    const data = {
      name: name.trim(),
      address: address.trim(),
      category: category,
      description: description?.trim() || null,
      phone: phone?.trim() || null,
      website: website?.trim() || null,

      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    console.log("data établissement :", data);

    try {
      const res = await createEtablishment(data);
      console.log("RES = ", res);

      // 3. reset UI après succès
      setName("");
      setAddress("");
      setPhone("");
      setWebsite("");
      setDescription("");
      setCategory("other");

      setOpen(false);
      setError("");
      setEstablishments((prev) => [...prev, res]);
    } catch (error) {
      console.error("Erreur création établissement :", error);
      setError("Erreur lors de la recherche de l'adresse");
      return ;
    }

    const data2 = {
      address: address.trim(),
      //type: type,
      category: category,

      latitude: coords.latitude,
      longitude: coords.longitude,

      
    };
  };

  return (
    <div className="flex justify-end">
      {/* BOUTON D'OUVERTURE */}
      <Button onClick={() => setOpen(true)}>
        Créer un établissement
      </Button>

      {/* POPUP */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">

          <DialogHeader>
            <DialogTitle>Créer un établissement</DialogTitle>
          </DialogHeader>

          {/* FORMULAIRE */}
          <div className="space-y-4 py-2">
            <Input
              placeholder="Nom de l'établissement"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Adresse (Ex: 35 rue de la Fou, Lesquerde)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              placeholder="Numéro de téléphone (facultatif)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Site web (facultatif)"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <Input
              placeholder="Description (facultatif)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Veuillez choisir une catégorie
            </p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Restaurant">Restaurant</SelectItem>
                <SelectItem value="Bar">Bar</SelectItem>
                <SelectItem value="Hotel">Hôtel</SelectItem>
                <SelectItem value="Shop">Boutique</SelectItem>
                <SelectItem value="Other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ACTIONS */}
          <DialogFooter className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>

            <Button
              onClick={handleCreate}
              disabled={!name.trim()}
            >
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}