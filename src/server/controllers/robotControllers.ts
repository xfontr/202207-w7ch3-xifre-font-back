import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import Robot from "../../database/models/Robot";
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

  const robot = await Robot.findById(idRobot);

  if (!robot) {
    next(createCustomError(404, "No robot found by the chosen id"));
    return;
  }

  debug(`Delivering the robot with ID ${idRobot}`);
  res.status(200).json(robot);

  next();
};

export const deleteRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;
  debug(`Trying to delete robot with id ${idRobot}`);

  try {
    const robot = await Robot.find({ _id: idRobot });

    if (robot.length === 0) {
      next(createCustomError(404, "No robots found by the chosen id"));
      return;
    }

    await Robot.deleteOne({ _id: idRobot });
    debug(`Deleted robot with ID ${idRobot}`);

    res
      .status(200)
      .json({ message: `Succesfully deleted the robot with ID ${idRobot}` });
    next();
  } catch {
    const error = createCustomError(404, `Something went wrong`);
    next(error);
  }
};

export const createRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newRobot = new Robot(req.body);
  debug(req.body);

  await newRobot.save();
  res.status(200).json({ newRobot });

  next();
};
