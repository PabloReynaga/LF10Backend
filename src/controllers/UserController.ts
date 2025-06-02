import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';

class UserController {
  static async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.login(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.register(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addPlantToUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.addPlantToUser(req.body.userId, req.body.plantId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async saveMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.saveMessage(req.body.conversationId, req.body.senderId, req.body.text);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllPlantByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.getAllPlantByUserId(req.params.userId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async removePlantFromUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.removePlantFromUser(req.body.userId, req.body.plantId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getAllUsers(res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.getAllUsers();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getConversationFromUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.getConversationFromUsers(req.params.conversationId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async initializeConversation( req:Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.initializeConversation(req.body.authUserId, req.body.userId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;