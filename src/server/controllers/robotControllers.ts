import { Response } from "express";
import Debug from "debug";
import chalk from "chalk";
import Robot from "../../database/models/Robots";

const debug = Debug("robots:robotControllers");

debug(chalk.green("test"));

const getAllRobots = async (res: Response) => {
  const robots = await Robot.find();
  debug(robots);
  res.status(200).json({ robots });
};

export default getAllRobots;
