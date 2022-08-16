import "./loadEnvironment";
// import express from "express";
// import morgan from "morgan";
import { connectDB, startServer } from "./server/startServer";
// import app from "./loadApp";
// import robotsRouter from "./server/routers/robotsRouter";
// import usersRouter from "./server/routers/usersRouter";

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
