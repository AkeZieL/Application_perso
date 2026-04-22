import api from "@/app/lib/api/axios";


const createEtablishment = async (params) => {
  try {
    //console.log({coords});
    const res = await api.post("etablissement/", params);
    console.log("ETABLISHMENT CREATED:", params);
    return res.data;
  } catch (error: any) {
    console.log("CREATE ETABLISHMENT ERROR:", error.response?.data || error.message);
    throw error;
  }
}

export default createEtablishment