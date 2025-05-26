import PlantDBSchema, { IPlantDBSchema } from '../models/PlantDBSchema';

class PlantRepository {

  static async getAllPlants(): Promise<any> {
      return PlantDBSchema.find({});
  }
}

export default PlantRepository;