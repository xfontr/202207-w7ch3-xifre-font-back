import "./loadEnvironment";
import { connectDB, startServer } from "./server/startServer";

const mongoUrl = "";

const port = +process.env.PORT ?? 4000;

(async () => {
  startServer(port);
  await connectDB(mongoUrl);
})();
