import api from "@/app/lib/api/axios";


const login = async (email, password) => {
  console.log({'login': email, 'password': password})
  try {
    const res = await api.post("auth/login/", {
      email,
      password,
    });
    return res.data;
  } catch (error: any) {
    console.log("LOGIN ERROR:", error.response?.data || error.message);
    throw error;
  }
}

export default login