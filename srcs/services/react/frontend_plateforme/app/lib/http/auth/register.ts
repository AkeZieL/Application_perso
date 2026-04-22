import api from "@/app/lib/api/axios";

const register = async (username, email, password1, password2) => {
  try {
    const res = await api.post("auth/register/", {
      email,
      username,
      password1,
      password2,
    });

    return res.data;
  } catch (error: any) {
    console.log("REGISTER ERROR:", error.response?.data || error.message);
    throw error;
  }
}

export default register