import getNearbyEstablishment from "@/app/lib/http/etablissement/getNearbyEstablishment"
import getNearbyEvent from "@/app/lib/http/event/getNearbyEvent"

const getNearbyAll = async (params) => {
    try {
        const [establishments, events] = await Promise.all([
            getNearbyEstablishment(params),
            getNearbyEvent(params),
        ]);

        return ([
            ...establishments,
            ...events,
        ]);
    } catch (error) {
        console.error("Erreur getNearbyAll:", error);
        throw error;
    }
}

export default getNearbyAll