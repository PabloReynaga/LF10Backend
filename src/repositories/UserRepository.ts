import UserDBSchema, { IUserDBSchema } from '../models/UserDBSchema';
import ConversationDBSchema  from '../models/ConversationDBSchema';
import MessageDBSchema  from '../models/MessageDBSchema';
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

    static async getAllUsers(): Promise<any> {
        return UserDBSchema.find();
    }

    static async getConversationFromUsers(conversationId: string): Promise<any> {
        return MessageDBSchema.find({ conversationId }).sort({ createdAt: 1 });
    }

    static async saveMessage(conversationId: string, senderId: string, text: string): Promise<any> {


        const newMessage = new MessageDBSchema({
            conversationId,
            sender: senderId,
            text,
        });
        return await newMessage.save();
    }

    static async initializeConversation(authUserId : string, userId: string): Promise<any> {
        const existingConversation = await ConversationDBSchema.findOne({
            participants: { $all: [authUserId, userId], $size: 2 }

        });
        if (!existingConversation) {
            const newConversation = new ConversationDBSchema({
                participants: [authUserId, userId]
            });
            await newConversation.save();
            return newConversation;
        }
        return existingConversation;
    }
}
export default UserRepository