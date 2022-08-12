import "./loadEnvironment";
import startServer from "./server/startServer";

const port = +process.env.PORT ?? 4000;

(async () => {
  startServer(port);
})();
