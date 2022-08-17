import { model, Schema } from "mongoose";

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    const newDocument = { ...ret };
    delete newDocument.password;
    return newDocument;
  },
});

export const User = model("User", userSchema, "users");
