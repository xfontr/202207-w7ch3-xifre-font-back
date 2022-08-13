import { Request, Response } from "express";
import getAllRobots from "./robotControllers";
import Robot from "../../database/models/Robots";

describe("Given a robotControllers controller", () => {
  describe("When function getAllRobots is called with a response and a request as arguments", () => {
    test("It should invoke the response 'status' method with '200'", async () => {
      const req = {} as Partial<Request>;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      Robot.find = jest.fn();
      await getAllRobots(req as Request, res as Response);
      const status = 200;
      expect(res.status).toBeCalledWith(status);
    });

    test("And it should invoke the 'json' method and return a list of Robots", async () => {
      const req = {} as Partial<Request>;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const mockRobots = [
        {
          name: "",
          img: "",
          creationDate: "",
          speed: 0,
          endurance: 0,
        },
      ];
      Robot.find = jest.fn().mockResolvedValue(mockRobots);
      await getAllRobots(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(mockRobots);
    });
  });
});
