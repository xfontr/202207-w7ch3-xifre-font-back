import "../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";
import app from "../loadApp";

const debug = Debug("robots:startServer");

export const startServer = (port: number): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.blue(`Server listening on ${port}`));
      resolve(true);
    });

    server.on("error", (error) => {
      debug(chalk.red(`Error connecting to the database: ${error.message}`));
      reject(error);
    });
  });

export const connectDB = (url: string): Promise<unknown> =>
  new Promise((resolve, reject) => {
    mongoose.connect(url, (error) => {
      if (error) {
        debug(chalk.red("Error while trying to connect to the Database"));
        reject(error);
        return;
      }

      debug(chalk.green("Connected to the Database"));
      resolve(true);
    });
  });
