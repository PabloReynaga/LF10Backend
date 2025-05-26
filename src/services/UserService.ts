import { IRegisterResponse, IUser } from '../types/types';
import { IUserDBSchema } from '../models/UserDBSchema';
import UserRepository from '../repositories/UserRepository';
import { ILoginResponse } from '../types/types';
import { comparePassword, generateToken, hashPassword } from '../auth';
import PlantRepository from "../repositories/PlantRepository";

import { ConflictError, NotFoundError, UnauthorizedError } from '../middlewares/errorHandler';

class UserService {

  static async login(user: IUser): Promise<ILoginResponse> {
    const userObject = await UserRepository.findUser(user.userName);

    if (!userObject) {
      throw new NotFoundError("User does not exist.");
    }

    const isPasswordValid = await comparePassword(user.password, userObject.hashedPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials.");
    }

    const jwt = generateToken(user.userName);
    return {
      message: 'User login successful!',
      status: 200,
      token: jwt,
      isLogined: true,
      userId: userObject._id.toString(),
    };
  }

  static async register(user: IUser): Promise<IRegisterResponse> {
    if (!user.password) {
      throw new ConflictError("Password is required.");
    }

    const hashedPassword = await hashPassword(user.password);

    const userRegister = {
      userName: user.userName,
      password: '', // just to satisfy the interface
      email: user.email,
      plants: [],
      hashedPassword,
    };

    const userObject = await UserRepository.registerNewUser(userRegister);
    if (!userObject) {
      throw new ConflictError("User with this name already exists.");
    }

    const jwt = generateToken(user.userName);

    return {
      message: 'User registered successfully!',
      status: 200,
      token: jwt,
      isLogined: true,
      userId: userObject._id.toString(),
    };
  }

  static async addPlantToUser(userId: string, plantId: string): Promise<any> {
    return UserRepository.addPlantToUser(userId, plantId);
  }

  static async getAllPlantByUserId(userId: string): Promise<any> {
    const plants = await UserRepository.getAllPlantByUserId(userId);
    if (!plants) {
      throw new NotFoundError("User not found or has no plants.");
    }
    return plants;
  }

  static async removePlantFromUser(userId: string, plantId: string): Promise<any> {
    return UserRepository.removePlantFromUser(userId, plantId);
  }
}

export default UserService;