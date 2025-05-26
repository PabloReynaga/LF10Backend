import PlantDBSchema, { IPlantDBSchema } from '../models/PlantDBSchema';

class PlantRepository {

  static async getAllPlants(): Promise<any> {
    try {
      let result =  await PlantDBSchema.find({});
      console.log(result);
      return result
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Error getting plants from database");
    }
  }






}

export default PlantRepository;