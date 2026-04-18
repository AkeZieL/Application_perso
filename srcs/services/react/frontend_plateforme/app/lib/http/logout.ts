import api from "../api/axios";


const logoutRequest = async () => {
  try {
    const res = await api.post("auth/logout/");
    return res.data;
  } catch (error: any) {
    console.log("LOGOUT HIHIHI ERROR:", error.response?.data || error.message);
    throw error;
  }
}

export default logoutRequest