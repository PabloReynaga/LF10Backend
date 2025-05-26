import { IResponse} from '../types/types';
import PlantRepository from '../repositories/PlantRepository';
import PlantDBSchema, { IPlantDBSchema } from '../models/PlantDBSchema';

class PlantService {
  static async getAllPlants(): Promise<any> {
    const plantList = await PlantRepository.getAllPlants();
    if (!plantList || plantList.length === 0) {
      return {
        message: 'No plants found.',
        status: 404
      };
    }
    return plantList;
  }
}

export default PlantService