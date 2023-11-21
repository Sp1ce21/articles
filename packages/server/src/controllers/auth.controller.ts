import { Request, Response } from "express";
import { getUserByEmail } from "../service/user.service";
import { comparePasswords, hashPassword } from "../service/auth.service";
import log from "../utils/logger";
import { signJwt } from "../utils/jwt";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).send("User with this email not found");
    }

    const isValidPassword = await comparePasswords(
      user.hashedPassword,
      password,
    );

    if (!isValidPassword) {
      return res.status(401).send("Wrong email or password");
    }

    const token = signJwt(user, { expiresIn: "30d" });

    return res.send(token);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).send("User with this email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    const token = signJwt(user, { expiresIn: "30d" });

    return res.send(token);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
