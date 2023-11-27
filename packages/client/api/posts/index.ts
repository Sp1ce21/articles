import api from "..";

interface FetchPostsParams {
  page?: number;
  search?: string;
  limit?: number;
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

export const fetchPostById = async (id: string) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
};

export const fetchDeletePost = async (id: string) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (e: any) {
    console.log(e.message);
  }
};

interface CreatePostProps {
  title: string;
  description: string;
}

export const fetchCreatePost = async (data: CreatePostProps) => {
  try {
    const response = await api.post("/posts", { ...data, categories: [] });
    return response.data;
  } catch (e: any) {
    console.log(e.message);
  }
};

interface EditPostProps {
  id: string;
  title: string;
  description: string;
}

export const fetchEditPost = async (data: EditPostProps) => {
  try {
    const response = await api.put("/posts", { ...data, categories: [] });
    return response.data;
  } catch (e: any) {
    console.log(e.message);
  }
};
