import express from "express";
import {
  getAllRobots,
  getRobot,
  deleteRobot,
  createRobot,
} from "../controllers/robotControllers";

const robotsRouter = express.Router();

robotsRouter.get("/", getAllRobots);
robotsRouter.get("/:idRobot", getRobot);
robotsRouter.post("/create", createRobot);
robotsRouter.delete("/delete/:idRobot", deleteRobot);

export default robotsRouter;
