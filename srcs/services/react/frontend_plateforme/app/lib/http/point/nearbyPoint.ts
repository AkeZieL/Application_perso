import api from "@/app/lib/api/axios";  

const getNearbyPoint = async (params) => {
    try {
        console.log("PARAM", params);
        const res = await api.get("point/nearby/", {
            params,
        });
        console.log("points nearby:", res.data);
        return res.data;
    } catch (error) {
        console.error("Erreur nearby:", error);
        throw error;
    }
}


export default getNearbyPoint