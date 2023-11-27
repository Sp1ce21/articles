"use server";

import { cookies } from "next/headers";

export const getTokenServer = () => {
  const token = cookies().get("token");
  return token?.value;
};
