import { User } from "@prisma/client";
import prisma from "./../libs/prismadb";
import jwt from "jsonwebtoken";

export const getCurrentUser = async (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as User;
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });
  return user;
};

export const getUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};
