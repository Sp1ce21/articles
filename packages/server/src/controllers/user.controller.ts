import { Request, Response } from "express";
import { getCurrentUser } from "../service/user.service";
import log from "../utils/logger";
import { verifyJwt } from "../utils/jwt";

export async function getCurrentUserHandler(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send("Token is not provided");
    }

    const isValidToken = verifyJwt(token);
    if (!isValidToken) {
      return res.status(401).send("Invalid token");
    }

    const user = await getCurrentUser(token);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // eslint-disable-next-line
    const { hashedPassword, ...restUser } = user;

    return res.send(restUser);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
