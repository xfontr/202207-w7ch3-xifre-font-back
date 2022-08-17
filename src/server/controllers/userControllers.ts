import { NextFunction, Request, Response } from "express";
import { User } from "../../database/models/User";
import { createToken, hashCreate, Payload } from "../../utils/auth";
import createCustomError from "../../utils/createCustomError";

const loginUser = (req: Request, res: Response) => {
  const user = req.body as { username: string; password: string };

  const payload: Payload = {
    id: "ey45123b00sV4",
    userName: user.username,
  };

  const responseData = {
    user: { token: createToken(payload) },
  };

  res.status(200).json(responseData);
};

interface UserRegister {
  userName: string;
  password: string;
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: UserRegister = req.body;
  user.password = await hashCreate(user.password);

  try {
    // const newUser = await User.create(user);
    await User.create(user);

    // res.status(201).json({ user: newUser });
    // OJO!!!! Aquí estaríamos devolviendo la contraseña, cosa que NO queremos hacer, ni encriptada.
    // Lo ponemos provisionalmente para ver cómo fuenciona
  } catch (error) {
    const customError = createCustomError(
      400,
      error.message,
      "Error creating new robot"
    );
    next(customError);
  }
};

export default loginUser;
