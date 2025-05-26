import { Request, Response, NextFunction } from 'express';
import PlantService from '../services/PlantService';

class PlantController {
  static async getAllPlants(req: Request, res: Response): Promise<any> {
    try {
      const data = await PlantService.getAllPlants();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  static async getAllPlantByUserId(req: Request, res: Response): Promise<any> {
    try {
      const data = await PlantService.getAllPlantByUserId(req.params.userId);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  static async saveCustomPlant(req: Request, res: Response): Promise<any> {
    try {
      const data = await PlantService.saveCustomPlant(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  static async addPlantToUser(req: Request, res: Response): Promise<any> {
    try {
      const { userId, plantId } = req.body;
      const result = await PlantService.addPlantToUser(userId, plantId);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  static async removePlantFromUser(req: Request, res: Response): Promise<any> {
    try {
      const { userId, plantId } = req.body;
      const result = await PlantService.removePlantFromUser(userId, plantId);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
}

export default PlantController;