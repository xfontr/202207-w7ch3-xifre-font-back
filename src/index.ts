import "./loadEnvironment";
import { connectDB, startServer } from "./server/startServer";

const mongoUrl = process.env.DATABASE;

const port = +process.env.PORT ?? 4000;

(async () => {
  try {
    await connectDB(mongoUrl);
    startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
