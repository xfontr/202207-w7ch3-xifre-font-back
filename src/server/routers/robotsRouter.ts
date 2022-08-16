import express from "express";
import {
  getAllRobots,
  getRobot,
  deleteRobot,
  createRobot,
  updateRobot,
} from "../controllers/robotControllers";
import authentication from "../middlewares/authentication";

const robotsRouter = express.Router();

robotsRouter.get("/", authentication, getAllRobots);
robotsRouter.get("/:idRobot", getRobot);
robotsRouter.post("/create", createRobot);
robotsRouter.delete("/delete/:idRobot", deleteRobot);
robotsRouter.put("/update", updateRobot);

export default robotsRouter;
