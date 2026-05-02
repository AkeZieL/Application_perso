import api from "@/app/lib/api/axios";  

const getNearbyEstablishment = async (params) => {
    try {
        console.log("PARAM", params);
        const res = await api.get("etablissement/nearby/", {
            params,
        });
        console.log("etablissement nearby:", res.data);
        return res.data;
    } catch (error) {
        console.error("Erreur établissement nearby:", error);
        throw error;
    }
}


export default getNearbyEstablishment