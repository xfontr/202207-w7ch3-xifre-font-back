import mongoose from "mongoose";

const { Schema } = mongoose;

const robotsSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  creationDate: {
    type: String,
    require: true,
  },
  speed: {
    type: Number,
    require: true,
  },
  endurance: {
    type: Number,
    require: true,
  },
});

const Robot = mongoose.model("Robot", robotsSchema, "robots");

export default Robot;
