import { NextFunction, Request, Response } from "express";
import Robot from "../../database/models/Robots";
import { getAllRobots, getRobot } from "./robotControllers";

describe("Given a robotControllers controller", () => {
  describe("When function getAllRobots is called with a response and a request as arguments", () => {
    test("It should invoke the response 'status' method with '200'", async () => {
      const req = {} as Partial<Request>;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const next = jest.fn() as Partial<NextFunction>;

      Robot.find = jest.fn();
      await getAllRobots(req as Request, res as Response, next as NextFunction);
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
      const next = jest.fn() as Partial<NextFunction>;

      Robot.find = jest.fn().mockResolvedValue(mockRobots);
      await getAllRobots(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(mockRobots);
    });
  });
});

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

    test("And it should invoke the 'json' method and return one specific robot", async () => {
      const req = {
        params: { idRobot: "1" } as any,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      const next = jest.fn() as Partial<NextFunction>;

      const mockRobots = [
        {
          id: "1",
          name: "",
          img: "",
          creationDate: "",
          speed: 0,
          endurance: 0,
        },
      ];

      const { idRobot } = req.params;

      Robot.find = jest
        .fn()
        .mockReturnValue(mockRobots.filter((robot) => robot.id === idRobot));

      await getRobot(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith([mockRobots[0]]);
    });
  });
});
