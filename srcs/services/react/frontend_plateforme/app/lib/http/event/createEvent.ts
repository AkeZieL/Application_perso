import api from "@/app/lib/api/axios";


const createPoint = async (coords) => {
  try {
    //console.log({coords});
    const res = await api.post("event/", coords);
    console.log("POINT CREATED:", coords);
    return res.data;
  } catch (error: any) {
    console.log("CREATE POINT ERROR:", error.response?.data || error.message);
    throw error;
  }
}

export default createPoint