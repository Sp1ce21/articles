import api from "..";

type LoginProps = {
  email: string;
  password: string;
};

export const fetchLogin = async (data: LoginProps) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
};

type RegisterProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const fetchRegister = async (data: RegisterProps) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
};
