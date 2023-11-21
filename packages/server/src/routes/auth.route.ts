import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { loginUserSchema, registerUserSchema } from "../schema/auth.schema";
import validate from "../middleware/validate";

const router = Router();

const authRoutes = () => {
  /**
   * @openapi
   * '/auth/login':
   *  post:
   *   tags:
   *   - Auth
   *   summary: User login
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           $ref: '#/components/schemas/LoginUserInput'
   *   responses:
   *    200:
   *      description: Success
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/LoginUserResponse'
   *    400:
   *      description: Bad request
   *    401:
   *      description: Unauthorized
   *    404:
   *      description: Not found
   *    409:
   *      description: Conflict
   */
  router.post("/login", validate(loginUserSchema), login);

  /**
   * @openapi
   * '/auth/register':
   *  post:
   *   tags:
   *   - Auth
   *   summary: User register
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           $ref: '#/components/schemas/RegisterUserInput'
   *   responses:
   *    200:
   *      description: Success
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/RegisterUserResponse'
   *    400:
   *      description: Bad request
   *    409:
   *      description: Conflict
   */
  router.post("/register", validate(registerUserSchema), register);

  return router;
};

export default authRoutes;
