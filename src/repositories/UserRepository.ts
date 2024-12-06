import UserDBSchema, { IUserDBSchema } from '../models/UserDBSchema';
import { IUser } from '../types/types';


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
    console.log(user);
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
}

export default UserRepository