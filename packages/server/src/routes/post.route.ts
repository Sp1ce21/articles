import { Router } from "express";
import {
  createPostHandler,
  deletePostByIdHandler,
  getPostByIdHandler,
  getPostsHandler,
  updatePostByIdHandler,
} from "../controllers/post.controller";
import requireUser from "../middleware/requireUser";
import { createPostSchema, updatePostSchema } from "../schema/post.schema";
import validate from "../middleware/validate";

const router = Router();

const postRoutes = () => {
  /**
   * @openapi
   * '/posts':
   *  get:
   *   tags:
   *   - Post
   *   summary: Get posts
   *   responses:
   *    200:
   *      description: Success
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/PostsResponse'
   *    400:
   *      description: Bad request
   */
  router.get("/", getPostsHandler);

  /**
   * @openapi
   * '/posts/{postId}':
   *  get:
   *   tags:
   *   - Post
   *   summary: Get post by id
   *   parameters:
   *    - name: postId
   *      in: path
   *      description: The id of the post
   *      required: true
   *   responses:
   *    200:
   *      description: Success
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/PostItem'
   *    400:
   *      description: Bad request
   *    404:
   *      description: Not found
   */
  router.get("/:postId", getPostByIdHandler);

  /**
   * @openapi
   * '/posts':
   *  post:
   *   tags:
   *   - Post
   *   summary: Create post
   *   security:
   *      - BearerAuth: []
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           $ref: '#/components/schemas/CreatePostInput'
   *   responses:
   *    200:
   *      description: Success
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreatePostResponse'
   *    400:
   *      description: Bad request
   *    401:
   *      description: Unauthorized
   */
  router.post(
    "/",
    [requireUser, validate(createPostSchema)],
    createPostHandler,
  );

  /**
   * @openapi
   * '/posts':
   *  put:
   *   tags:
   *   - Post
   *   summary: Update post by id
   *   security:
   *      - BearerAuth: []
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           $ref: '#/components/schemas/ChangePostInput'
   *   responses:
   *    200:
   *      description: Success
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/ChangePostResponse'
   *    400:
   *      description: Bad request
   *    401:
   *      description: Unauthorized
   *    404:
   *      description: Not found
   */
  router.put(
    "/",
    [requireUser, validate(updatePostSchema)],
    updatePostByIdHandler,
  );

  /**
   * @openapi
   * '/posts/{postId}':
   *  delete:
   *   tags:
   *   - Post
   *   security:
   *      - BearerAuth: []
   *   summary: Delete post by id
   *   parameters:
   *    - name: postId
   *      in: path
   *      description: The id of the post
   *      required: true
   *   responses:
   *    200:
   *      description: Success
   *    400:
   *      description: Bad request
   *    404:
   *      description: Not found
   */
  router.delete("/:postId", requireUser, deletePostByIdHandler);

  return router;
};

export default postRoutes;
