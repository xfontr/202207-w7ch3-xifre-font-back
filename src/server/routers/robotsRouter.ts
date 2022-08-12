import express from "express";
import getAllRobots from "../controllers/robotControllers";

const robotsRouter = express.Router();
robotsRouter.get("/", getAllRobots);

export default robotsRouter;
