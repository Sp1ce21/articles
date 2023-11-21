import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *      LoginUserInput:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            default: jane.doe@example.com
 *          password:
 *            type: string
 *            default: stringPassword123
 *      LoginUserResponse:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 *
 *
 *      RegisterUserInput:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - confirmPassword
 *        properties:
 *          email:
 *            type: string
 *            default: jane.doe@example.com
 *          password:
 *            type: string
 *            default: stringPassword123
 *          confirmPassword:
 *            type: string
 *            default: stringPassword123
 *      RegisterUserResponse:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 */

export const registerUserSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    confirmPassword: string({
      required_error: "confirmPassword is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export const loginUserSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export type RegisterUserInput = Omit<
  TypeOf<typeof registerUserSchema>,
  "body.confirmPassword"
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
