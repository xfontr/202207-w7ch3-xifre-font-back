import "../loadEnvironment";
import jwt from "jsonwebtoken";

export interface Payload {
  id: string;
  userName: string;
  asdf: string;
}

export const createToken = (payload: Payload) =>
  jwt.sign(payload, process.env.SECRET);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET);
