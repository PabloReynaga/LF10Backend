import UserDBSchema, { IUserDBSchema } from '../models/UserDBSchema';
import { IUser } from '../types/types';
import mongoose from "mongoose";
import PlantDBSchema from "../models/PlantDBSchema";


class UserRepository {
  static async findUser(username: string): Promise<IUserDBSchema | null> {
    try {
      const user = await UserDBSchema.findOne({ userName: username });
      if (user != null) {
        return user;
      }
      return null;
    }catch (error) {
      console.error("Database Error:", error);
      throw new Error("Error finding user in the database");
    }
  }
  static async registerNewUser(user:IUser): Promise<IUserDBSchema | null> {
    try{
      const existingUser = await UserDBSchema.findOne({ userName: user.userName });

      if (existingUser) {
        return null;
      }
      return await new UserDBSchema(user).save();
    }catch (error){
      console.error("Database Error:", error);
      throw new Error("Error creating new user");
    }
  }

  static async addPlantToUser(userId: string, plantId: string): Promise<any> {
    try {
      return await UserDBSchema.updateOne(
          { _id: new mongoose.Types.ObjectId(userId) },
          { $addToSet: { plants: new mongoose.Types.ObjectId(plantId) } }
      );
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Error adding plant to user");
    }
  }

  static async getAllPlantByUserId(userId: string): Promise<any> {
    try {
      const user = await UserDBSchema.findById(userId).populate('plants');
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Error getting user's plants from database");
    }
  }
}

export default UserRepository