import { Request, Response, NextFunction } from 'express';
import PlantService from '../services/PlantService';

class PlantController {
  static async getAllPlants(req: Request, res: Response): Promise<any> {
    try {
      const data = await PlantService.getAllPlants();
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
}

export default PlantController;