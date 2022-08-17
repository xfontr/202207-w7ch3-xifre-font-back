import "../loadEnvironment";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface Payload {
  id: string;
  userName: string;
}

export const createToken = (payload: Payload) =>
  jwt.sign(payload, process.env.SECRET);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET);

export const hashCreate = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};
