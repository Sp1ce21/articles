import express from "express";
import logger from "./utils/logger";
import dotenv from "dotenv";
import swaggerDocs from "./utils/swagger";
import routes from "./routes";
import { initRSSParsing } from "./utils/initRSSParsing";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3021;

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(express.json());

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  routes(app);

  initRSSParsing();

  swaggerDocs(app, port as number);
});
