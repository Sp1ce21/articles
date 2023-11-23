import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { getCurrentUser } from "../service/user.service";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token === "undefined" || !token) {
    return res.status(401).send("Token is not provided");
  }

  const isValidToken = verifyJwt(token);
  if (!isValidToken) {
    return res.status(401).send("Invalid token");
  }

  const user = await getCurrentUser(token);

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireUser;
