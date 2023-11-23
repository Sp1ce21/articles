import api from "..";

interface FetchPostsParams {
  page?: number;
  search?: string;
}

export const fetchPosts = async (params: FetchPostsParams) => {
  try {
    const response = await api.get("/posts", {
      params,
    });
    return response.data;
  } catch (e: any) {
    console.log(e.message);
    return [];
  }
};
