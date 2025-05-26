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

  static async getAllPlantByUserId(userId: string): Promise<Plant[] | IResponse> {
    const userPlants = await PlantRepository.getAllPlantByUserId(userId);
    if (!userPlants || userPlants.length === 0) {
      return {
        message: 'No plants found for this user.',
        status: 404
      };
    }
    return userPlants;
  }

  static async saveCustomPlant(plant: Plant): Promise<Plant | IResponse> {
    const plantDBInstance = new Plant({
      userId: plant.userId,
      name: plant.name,
      description: plant.description,
      image: plant.image,
      // Agrega otros campos si es necesario
    });
    return await PlantRepository.saveCustomPlant(plantDBInstance);
  }

  static async addPlantToUser(userId: string, plantId: string): Promise<IResponse> {
    const result = await PlantRepository.addPlantToUser(userId, plantId);
    if (!result) {
      return {
        message: 'Could not add plant to user.',
        status: 500
      };
    }
    return result;
  }

  static async removePlantFromUser(userId: string, plantId: string): Promise<IResponse> {
    const result = await PlantRepository.removePlantFromUser(userId, plantId);
    if (!result) {
      return {
        message: 'Could not remove plant from user.',
        status: 500
      };
    }
    return result;
  }
}

export default PlantService