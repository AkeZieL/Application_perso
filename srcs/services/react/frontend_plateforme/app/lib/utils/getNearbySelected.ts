import getNearbyEstablishment from "@/app/lib/http/etablissement/getNearbyEstablishment"
import getNearbyEvent from "@/app/lib/http/event/getNearbyEvent"
import getNearbyAll from "./getNearbyAll";

const getNearbySelected = async (params) => {
    if(params.type === "event") {
        try {
            const events = await getNearbyEvent(params);
            return (events);
        } catch (error) {
            console.error("Erreur getNearbySelected (event): ", error);
            throw error;
        }
    }
    else if (params.type === "place") {
        try {
            const events = await getNearbyEstablishment(params);
            return (events);
        } catch (error) {
            console.error("Erreur getNearbySelected (place): ", error);
            throw error;
        }
    }
    else {
        try {
            const events = await getNearbyAll(params);
            return (events);
        } catch (error) {
            console.error("Erreur getNearbySelected (all): ", error);
            throw error;
        }
    }
}
export default getNearbySelected