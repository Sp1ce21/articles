import { Request, Response } from "express";
import log from "../utils/logger";
import {
  createPost,
  deletePostById,
  getPostById,
  getPosts,
  updatePostById,
} from "../service/post.service";

export async function getPostsHandler(req: Request, res: Response) {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const postsData = await getPosts({
      page: +page,
      limit: +limit,
      search: search as string,
    });

    return res.send(postsData);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getPostByIdHandler(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const post = await getPostById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    return res.send(post);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function updatePostByIdHandler(req: Request, res: Response) {
  try {
    const { id, ...updatedPost } = req.body;
    const existingPost = await getPostById(id);
    if (!existingPost) {
      return res.status(404).send("Post not found");
    }

    const post = await updatePostById(id, updatedPost);
    return res.send(post);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function createPostHandler(req: Request, res: Response) {
  try {
    const post = req.body;
    const createdPost = await createPost(post);
    return res.send(createdPost);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function deletePostByIdHandler(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const existingPost = await getPostById(postId);
    if (!existingPost) {
      return res.status(404).send("Post not found");
    }

    await deletePostById(postId);
    return res.send("Post successfully deleted");
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
