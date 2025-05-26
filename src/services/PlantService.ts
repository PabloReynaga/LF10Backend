import { IResponse} from '../types/types';
import PlantRepository from '../repositories/PlantRepository';
import PlantDBSchema, { IPlantDBSchema } from '../models/PlantDBSchema';

class PlantService {
  static async getAllPlants(): Promise<any> {
    const plantList = await PlantRepository.getAllPlants();
    if (!plantList || plantList.length === 0) {
      throw new Error('DataBase plants not found');
    }
    return plantList;
  }
}

export default PlantService