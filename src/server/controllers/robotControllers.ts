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
  try {
    const robots = await Robot.find({});
    debug("Delivering all robots");
    res.status(200).json(robots);
    next();
  } catch {
    const error = createCustomError(
      404,
      "Could not fetch robots from database"
    );
    next(error);
  }
};

export const getRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;

  const robots = await Robot.find({ _id: idRobot });

  debug(`Delivering the robot with ID ${idRobot}`);
  await res.status(200).json(robots);

  next();
};
