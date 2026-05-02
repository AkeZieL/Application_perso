import api from "@/app/lib/api/axios";  

const getNearbyEvent = async (params) => {
    try {
        console.log("PARAM", params);
        const res = await api.get("event/nearby/", {
            params,
        });
        console.log("event nearby:", res.data);
        return res.data;
    } catch (error) {
        console.error("Errorr event nearby:", error);
        throw error;
    }
}

export default getNearbyEvent