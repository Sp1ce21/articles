import z, { TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *      PostItem:
 *          type: object
 *          properties:
 *              id:
 *                type: string
 *              link:
 *                type: string
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              categories:
 *                type: array
 *                items:
 *                  type: string
 *              createdAt:
 *                type: string
 *
 *      PostsResponse:
 *        type: object
 *        properties:
 *          total:
 *              type: number
 *          posts:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/PostItem'
 *
 *      CreatePostInput:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          categories:
 *            type: array
 *            items:
 *              type: string
 *
 *      CreatePostResponse:
 *          $ref: '#/components/schemas/PostItem'
 *
 *
 *      ChangePostInput:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              categories:
 *                type: array
 *                items:
 *                  type: string
 *
 *      ChangePostResponse:
 *          $ref: '#/components/schemas/PostItem'
 */

export const createPostSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    categories: z.array(z.string()),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    categories: z.array(z.string()),
  }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;
export type UpdatePostInput = TypeOf<typeof updatePostSchema>;
