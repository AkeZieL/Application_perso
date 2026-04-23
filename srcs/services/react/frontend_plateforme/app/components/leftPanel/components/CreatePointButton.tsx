"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import subscription from "@/app/lib/api/subscription"

import AddEtablishmentCard from "@/app/dashboard/components/AddEtablishmentCard"

export default function CreatePointButton() {
  const [showCreate, setShowCreate] = useState(false);
  const [showSubscribe, setShowSubscibe] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    if (!showCreate) return;

    router.push("/dashboard?tab=establishment");
    setShowCreate(false);
  }, [showCreate, router]);

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
    </>
  );
}