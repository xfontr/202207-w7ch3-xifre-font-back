import "../loadEnvironment";
import express from "express";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("robots:start");

const app = express();

const startServer = (port: number): Promise<unknown> =>
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

export default startServer;
