"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import subscription from "@/app/lib/api/subscription"

export default function CreatePointButton({ onSelect }) {
  const [showCreate, setShowCreate] = useState(false);
  const [showSubscribe, setShowSubscibe] = useState(false);
  const [address, setAddress] = useState("");

  const handleSelect = (mode) => {
    onSelect(mode);      // envoie au parent
    setShowCreate(false); // ferme le popup
  };

  const upgradeSubscriptionPlan = async () => {
    try {
      const res = await subscription.post("upgrade-subscription/");
      console.log("UPGRADE SUB DATA:", res.data);
    }  catch (error : any) {
      console.log("upgrade-subscription error:", error.response?.data || error.message);
    }
    setShowSubscibe(false);
  }

  const checkSubscription = async () => {
    try {
      const res = await subscription.get("check-subscription/")
      console.log("TMP DATA:", res.data);
      if (res.data.allowed === true) {
        setShowCreate(true);
        return ;
      }
      setShowSubscibe(true);
      console.log("L'abonnement ne vous permet pas de crée un point");
    } catch (error : any) {
      console.log("check-subscription error:", error.response?.data || error.message);
    }
  }

  return (
    <>
      <button onClick={() => checkSubscription()}>
        Créer un lieu
      </button>

      {showSubscribe && (
        <div className="modal">
          <button onClick={() => upgradeSubscriptionPlan()}>
            Souscrire à l'abonnement Pro (c'est gratuit pour vous)
          </button>
        </div>
      )}

      {showCreate && (
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogOverlay className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm" />

          <DialogContent className="sm:max-w-md z-[9999]">
            <DialogHeader>
              <DialogTitle>Ajouter votre établissement à vôtre profil !</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ex: 22 rue de la Boite, Lézignan-Corbières"
                    className="border p-2 w-full rounded"
                />
            </div>
          {/* 
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => handleSelect("address")}
              >
                Via adresse
              </Button>

              <Button
                className="w-full"
                onClick={() => handleSelect("map")}
                variant="outline"
              >
                En cliquant sur la carte
              </Button>
            </div>

            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setShowCreate(false)}
                className="w-full"
              >
                Annuler
              </Button>
            </DialogFooter>
            */}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}