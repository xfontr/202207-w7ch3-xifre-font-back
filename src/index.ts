import "./loadEnvironment";
import express from "express";
import { connectDB, startServer } from "./server/startServer";
import robotsRouter from "./server/routers/robotsRouter";


const mongoUrl = process.env.DATABASE;

const port = +process.env.PORT ?? 4000;

const app = express();

app.use("/robots", robotsRouter);


(async () => {
  try {
    startServer(port);
    await connectDB(mongoUrl);
  } catch (error) {
    process.exit(1);
  }
})();
