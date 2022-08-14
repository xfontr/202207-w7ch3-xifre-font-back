import mongoose from "mongoose";

const { Schema } = mongoose;

const robotSchema = new Schema({
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

const Robot = mongoose.model("Robot", robotSchema, "robots");

export default Robot;
