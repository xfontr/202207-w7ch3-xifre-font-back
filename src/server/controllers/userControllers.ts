import { Request, Response } from "express";
import { createToken, Payload } from "../../utils/auth";

const loginUser = (req: Request, res: Response) => {
  const user = req.body as { username: string; password: string };

  const payload: Payload = {
    id: "nkefubsu",
    userName: user.username,
    asdf: "asdfasdf",
  };

  const responseData = {
    user: { token: createToken(payload) },
  };

  res.status(200).json(responseData);
};

export default loginUser;
