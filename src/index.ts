import "./loadEnvironment";
import express from "express";
import morgan from "morgan";
import { connectDB, startServer } from "./server/startServer";
import app from "./loadApp";
import robotsRouter from "./server/routers/robotsRouter";

const mongoUrl = process.env.DATABASE;

const port = +process.env.PORT ?? 4000;

app.use(express.json());

app.use("/robots", robotsRouter);
app.use(morgan("dev"));

(async () => {
  try {
    await connectDB(mongoUrl);
    startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
