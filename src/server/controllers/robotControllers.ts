import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import Robot from "../../database/models/Robots";
import createCustomError from "../../utils/createCustomError";

const debug = Debug("robots:robotControllers");

export const getAllRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const robots = await Robot.find({});

  debug("Delivering all robots");
  res.status(200).json(robots);

  next();
};

export const getRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;

  const robots = await Robot.find({ _id: idRobot });

  if (robots.length === 0) {
    next(createCustomError(404, "No robots found by the chosen id"));
    return;
  }

  debug(`Delivering the robot with ID ${idRobot}`);
  await res.status(200).json(robots);

  next();
};
