import { fetchCurrentUser } from "@/api/user";
import { redirect } from "next/navigation";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = async ({ children }) => {
  const user = await fetchCurrentUser();

  if (user) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default AuthLayout;
