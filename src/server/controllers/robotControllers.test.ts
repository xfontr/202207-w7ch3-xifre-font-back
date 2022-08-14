import { NextFunction, Request, Response } from "express";
import Robot from "../../database/models/Robots";
import createCustomError from "../../utils/createCustomError";
import {
  createRobot,
  deleteRobot,
  getAllRobots,
  getRobot,
} from "./robotControllers";

jest.mock("./robotControllers", () => ({
  ...jest.requireActual("./robotControllers"),
  createRobot: jest.fn(
    async (req: Request, res: Response, next: NextFunction) => {
      const newRobot = new Robot(req.body);
      newRobot.save = jest.fn();
      await newRobot.save();
      res.status(200).json({ newRobot });
      next();
    }
  ),
}));

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

    test("And if there is an error in the process, we should send an error", async () => {
      const error = createCustomError(
        404,
        "Could not fetch robots from database"
      );
      const req = {} as Partial<Request>;
      Robot.find = jest.fn().mockRejectedValue(new Error(""));
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const next = jest.fn() as Partial<NextFunction>;

      await getAllRobots(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
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
      Robot.findById = jest.fn().mockReturnValue([
        {
          id: "1",
          name: "",
          img: "",
          creationDate: "",
          speed: 0,
          endurance: 0,
        },
      ]);

      await getRobot(req as Request, res as Response, next as NextFunction);
      const status = 200;

      expect(res.status).toBeCalledWith(status);
    });

    test("It should return an error if there are no robots", async () => {
      const req = {
        params: "" as unknown,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      const next = jest.fn() as Partial<NextFunction>;
      Robot.findById = jest.fn().mockReturnValue(undefined);

      await getRobot(req as Request, res as Response, next as NextFunction);

      expect(next).toBeCalledWith(
        createCustomError(404, "No robot found by the chosen id")
      );
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

      Robot.findById = jest
        .fn()
        .mockReturnValue(mockRobots.filter((robot) => robot.id === idRobot));

      await getRobot(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith([mockRobots[0]]);
    });
  });
});

describe("Given a function deleteRobot", () => {
  describe("When called with a request, a response and a next function as parameters", () => {
    test("It should invoke the response 'status' method with '200'", async () => {
      const req = {} as Partial<Request>;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const next = jest.fn() as Partial<NextFunction>;

      Robot.find = jest.fn();
      Robot.deleteOne = jest.fn();
      await getAllRobots(req as Request, res as Response, next as NextFunction);
      const status = 200;
      expect(res.status).toBeCalledWith(status);
    });

    test("And it should invoke the json method with a message", async () => {
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
      const message = {
        message: `Succesfully deleted the robot with ID ${idRobot}`,
      };
      Robot.find = jest
        .fn()
        .mockReturnValue(mockRobots.filter((robot) => robot.id === idRobot));
      Robot.deleteOne = jest.fn().mockReturnValue(1);
      await deleteRobot(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(message);
    });

    test("And if there is an error in the process, we should send an error", async () => {
      const error = createCustomError(404, `Something went wrong`);
      const req = {
        params: { idRobot: "1" } as any,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      const next = jest.fn() as Partial<NextFunction>;
      Robot.find = jest.fn().mockRejectedValue(new Error("error"));
      Robot.deleteOne = jest.fn().mockReturnValue(1);
      await deleteRobot(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a createRobot function", () => {
  describe("When it's called with a response and a request as arguments", () => {
    test("It should invoke the response 'status' method with '200'", async () => {
      const req = {
        body: {},
      } as Partial<Request>;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const next = jest.fn() as Partial<NextFunction>;
      const status = 200;

      await createRobot(req as Request, res as Response, next as NextFunction);

      expect(res.status).toBeCalledWith(status);
    });

    test("And it should invoke the 'json' method and return a list of Robots", async () => {
      const req = {
        body: {
          name: "",
          image: "",
          creationDate: "",
          speed: 0,
          endurance: 0,
        },
      } as Partial<Request>;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const next = jest.fn() as Partial<NextFunction>;

      await createRobot(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalled();
    });
  });
});
