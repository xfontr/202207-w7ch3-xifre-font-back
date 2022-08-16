import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../utils/auth";
import createCustomError from "../../utils/createCustomError";

interface CustomRequest extends Request {
  payload: JwtPayload;
}

const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const dataAuthentication = req.get("Authorization");

  if (!dataAuthentication || !dataAuthentication.startsWith("Bearer")) {
    const error = createCustomError(400, "Bad request", "Authentication Error");
    next(error);
    return;
  }

  const token = dataAuthentication.slice(7);

  const tokenData = verifyToken(token);

  if (typeof tokenData === "string") {
    const error = createCustomError(
      400,
      "Invalid token",
      "Authentication Error"
    );
    next(error);
    return;
  }
  req.payload = tokenData;
  next();
};
export default authentication;
