import { Post } from "@prisma/client";
import prisma from "../libs/prismadb";

type PostsQuery = {
  page: number;
  limit: number;
  search?: string;
};

export const getPosts = async (query: PostsQuery) => {
  const { page, limit, search } = query;

  const searchString = search || "";

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            categories: {
              has: searchString.toLowerCase(),
            },
          },
        ],
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.post.count({
      where: {
        OR: [
          {
            title: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            categories: {
              has: searchString.toLowerCase(),
            },
          },
        ],
      },
    }),
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

export const createPost = async (post: Post) => {
  return await prisma.post.create({
    data: { ...post, link: null },
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
