import { Express } from "express";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import postRoutes from "./routes/post.route";

const routes = (app: Express) => {
  app.use("/user", userRoutes());
  app.use("/auth", authRoutes());
  app.use("/posts", postRoutes());
};

export default routes;
