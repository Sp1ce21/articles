import logger from "pino";
import PinoPretty from "pino-pretty";

const prettyStream = PinoPretty({
  colorize: true,
  translateTime: true,
});

const log = logger(prettyStream);

export default log;
