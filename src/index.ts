import "./loadEnvironment";
import { connectDB, startServer } from "./server/startServer";

const port = +process.env.PORT ?? 4000;

const mongoUrl = "";

(async () => {
  startServer(port);
  await connectDB(mongoUrl);
})();
