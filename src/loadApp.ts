import express from "express";
import cors from "cors";
import morgan from "morgan";
import robotsRouter from "./server/routers/robotsRouter";
import usersRouter from "./server/routers/usersRouter";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/robots", robotsRouter);
app.use("/users", usersRouter);
app.use(morgan("dev"));

export default app;
