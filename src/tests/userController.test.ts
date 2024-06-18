import { Request, Response } from 'express';
import UserController from '../controllers/userController';
import UserService from '../services/userService';

jest.mock('../services/userService');

describe('UserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {};
    res = {
      status: statusMock,
    };
  });

  describe('createUser', () => {
    it('should create a new user and return 201 status', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'password' };
      (UserService.createUser as jest.Mock).mockResolvedValue(user);

      req.body = user;

      await UserController.createUser(req as Request, res as Response);

      expect(UserService.createUser).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(user);
    });

    it('should return 400 status if an error occurs', async () => {
      const errorMessage = 'User is blacklisted';
      (UserService.createUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

      req.body = { name: 'John Doe', email: 'john.doe@example.com', password: 'password' };

      await UserController.createUser(req as Request, res as Response);

      expect(UserService.createUser).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getUser', () => {
    it('should return a user and 200 status', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'password' };
      (UserService.getUser as jest.Mock).mockResolvedValue(user);

      req.params = { id: '1' };

      await UserController.getUser(req as Request, res as Response);

      expect(UserService.getUser).toHaveBeenCalledWith(1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(user);
    });

    it('should return 400 status if an error occurs', async () => {
      const errorMessage = 'User not found';
      (UserService.getUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

      req.params = { id: '1' };

      await UserController.getUser(req as Request, res as Response);

      expect(UserService.getUser).toHaveBeenCalledWith(1);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user and 200 status', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'password' };
      (UserService.getUserByEmail as jest.Mock).mockResolvedValue(user);

      req.params = { email: 'john.doe@example.com' };

      await UserController.getUserByEmail(req as Request, res as Response);

      expect(UserService.getUserByEmail).toHaveBeenCalledWith('john.doe@example.com');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(user);
    });

    it('should return 400 status if an error occurs', async () => {
      const errorMessage = 'User not found';
      (UserService.getUserByEmail as jest.Mock).mockRejectedValue(new Error(errorMessage));

      req.params = { email: 'john.doe@example.com' };

      await UserController.getUserByEmail(req as Request, res as Response);

      expect(UserService.getUserByEmail).toHaveBeenCalledWith('john.doe@example.com');
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
