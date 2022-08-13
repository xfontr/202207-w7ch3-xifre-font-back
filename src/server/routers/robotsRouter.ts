import express from "express";
import { getAllRobots, getRobot } from "../controllers/robotControllers";

const robotsRouter = express.Router();
robotsRouter.get("/", getAllRobots);
robotsRouter.get("/:idRobot", getRobot);

export default robotsRouter;
