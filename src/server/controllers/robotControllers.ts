import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import Robot from "../../database/models/Robots";

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

  debug(`Delivering the robot with ID ${idRobot}`);
  await res.status(200).json(robots);

  next();
};
