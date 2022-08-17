import express from "express";
import loginUser, { registerUser } from "../controllers/userControllers";

const usersRouter = express.Router();

usersRouter.post("/login", loginUser);
usersRouter.post("/register", registerUser);

export default usersRouter;
