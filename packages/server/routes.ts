import { Express } from "express";
import log from "./utils/logger";

const routes = (app: Express) => {
    log.info(app)
};

export default routes;
