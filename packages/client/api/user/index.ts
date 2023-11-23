import api from "..";

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get("/user/current");
    return response.data;
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
};
