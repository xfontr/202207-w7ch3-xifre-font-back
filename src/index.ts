import express from "express";
import Debug from "debug";

const debug = Debug("robots:index");

const app = express();

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug("hi");
});
