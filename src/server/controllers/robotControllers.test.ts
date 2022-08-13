import { NextFunction, Request, Response } from "express";
import Robot from "../../database/models/Robots";
import { getRobot } from "./robotControllers";

describe("Given a function getRobot", () => {
  describe("When called with a request, a response and a next function as parameters", () => {
    test("It should invoke the response 'status' method with '200'", async () => {
      const req = {
        params: "" as unknown,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      const next = jest.fn() as Partial<NextFunction>;
      Robot.find = jest.fn();

      await getRobot(req as Request, res as Response, next as NextFunction);
      const status = 200;

      expect(res.status).toBeCalledWith(status);
    });
  });
});
