import UserDBSchema, { IUserDBSchema } from '../models/UserDBSchema';
import { IUser } from '../types/types';
import mongoose from "mongoose";

class UserRepository {
  static async findUser(username: string): Promise<IUserDBSchema | null> {
      const user = await UserDBSchema.findOne({userName: username});
      if (user) {
        return user;
      }
      return null;
  }

  static async registerNewUser(user: IUser): Promise<IUserDBSchema | null> {
    const existingUser = await UserDBSchema.findOne({userName: user.userName});
    if (existingUser) {
      return null;
    }
    return await new UserDBSchema(user).save();
  }

  static async addPlantToUser(userId: string, plantId: string): Promise<any> {
      return UserDBSchema.updateOne(
          {_id: new mongoose.Types.ObjectId(userId)},
          {$addToSet: {plants: new mongoose.Types.ObjectId(plantId)}}
      );
  }

  static async getAllPlantByUserId(userId: string): Promise<any> {
      const user = await UserDBSchema.findById(userId).populate('plants');
      if (!user) {
          return null;
      }
      return user.plants
  }

  static async removePlantFromUser(userId: string, plantId: string): Promise<any> {
    return UserDBSchema.updateOne(
        {_id: new mongoose.Types.ObjectId(userId)},
        {$pull: {plants: new mongoose.Types.ObjectId(plantId)}}
    );
  }
}
export default UserRepository