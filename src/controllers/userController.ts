import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUser(parseInt(req.params.id));
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  static async getUserByEmail(req: Request, res: Response) {
    try {
      const user = await UserService.getUserByEmail(req.params.email);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }
}

export default UserController;
