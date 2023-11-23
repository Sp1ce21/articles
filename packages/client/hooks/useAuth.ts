"use client";

import { useCallback } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const saveToken = useCallback((token: string) => {
    Cookies.set("token", token);
  }, []);

  const removeToken = useCallback(() => {
    Cookies.remove("token");
  }, []);

  return { saveToken, removeToken };
};

export default useAuth;
