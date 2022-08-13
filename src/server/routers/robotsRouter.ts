import express from "express";
import {
  getAllRobots,
  getRobot,
  deleteRobot,
} from "../controllers/robotControllers";

const robotsRouter = express.Router();
robotsRouter.get("/", getAllRobots);
robotsRouter.get("/:idRobot", getRobot);
robotsRouter.delete("/delete/:idRobot", deleteRobot);

export default robotsRouter;
