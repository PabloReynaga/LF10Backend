import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';

class UserController {
  static async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = await UserService.login(req.body);
      return res.status(data.status).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: 'Internal server error.'});
    }
  }
  static async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = await UserService.register(req.body);
      return res.status(data.status).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: 'Internal server error.'});
    }
  }
}

export default UserController;