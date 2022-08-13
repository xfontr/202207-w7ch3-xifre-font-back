import { Request, Response } from "express";
import Debug from "debug";
import Robot from "../../database/models/Robots";

const debug = Debug("robots:robotControllers");

const getAllRobots = async (req: Request, res: Response) => {
  const robots = await Robot.find({});

  await debug(robots);
  await res.status(200).json(robots);
};

export default getAllRobots;
