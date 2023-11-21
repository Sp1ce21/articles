import { Express } from "express";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";

const routes = (app: Express) => {
  app.use("/user", userRoutes());
  app.use("/auth", authRoutes());
};

export default routes;
