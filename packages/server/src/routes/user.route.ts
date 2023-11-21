import { Router } from "express";
import { getCurrentUserHandler } from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";

const router = Router();

const userRoutes = () => {
  /**
   * @openapi
   * '/user/current':
   *  get:
   *   tags:
   *   - User
   *   summary: Get current user
   *   security:
   *      - BearerAuth: []
   *   responses:
   *    200:
   *      description: Success
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CurrentUserResponse'
   *    400:
   *      description: Bad request
   *    401:
   *      description: Unauthorized
   *    404:
   *      description: Not found
   */
  router.get("/current", requireUser, getCurrentUserHandler);

  return router;
};

export default userRoutes;
