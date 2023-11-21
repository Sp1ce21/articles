import { Post } from "@prisma/client";
import prisma from "../libs/prismadb";

type PostsQuery = {
  page: number;
  limit: number;
};

export const getPosts = async (query: PostsQuery) => {
  const { page, limit } = query;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.post.count(),
  ]);

  return { posts, total };
};

export const getPostById = async (id: string) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
};

export const updatePostById = async (id: string, updatedPost: Post) => {
  return await prisma.post.update({
    where: {
      id,
    },
    data: updatedPost,
  });
};

export const deletePostById = async (id: string) => {
  return await prisma.post.delete({
    where: {
      id,
    },
  });
};
