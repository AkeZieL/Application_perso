"use client";

import { useRouter } from "next/navigation";
import logoutRequest from "../lib/http/logout";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error: any) {
      console.log("LOGOUT ERROR:", error.response?.data || error.message);
      throw error;
    }

    router.push("/auth/login");
    router.refresh();
  };

  return logout;
}