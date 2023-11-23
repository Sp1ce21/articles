import { getTokenServer } from "@/utils/getTokenServer";
import axios from "axios";
import Cookies from "js-cookie";

function getCookie(name: string) {
  if (typeof window === "undefined") {
    return getTokenServer();
  } else {
    return Cookies.get(name);
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: any) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
