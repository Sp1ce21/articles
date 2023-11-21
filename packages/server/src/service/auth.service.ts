import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = (hashPassword: string, password: string) => {
  return bcrypt.compare(password, hashPassword);
};
