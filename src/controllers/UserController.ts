import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import PlantService from "../services/PlantService";
import userService from "../services/UserService";

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

  static async addPlantToUser(req: Request, res: Response): Promise<any> {
    try {
      const data = await UserService.addPlantToUser(req.body.userId, req.body.plantId);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  static async getAllPlantByUserId(req: Request, res: Response): Promise<any> {
    try {
      const data = await UserService.getAllPlantByUserId(req.params.userId);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

}

export default UserController;