import { IRegisterResponse, IUser } from '../types/types';
import { IUserDBSchema } from '../models/UserDBSchema';
import UserRepository from '../repositories/UserRepository';
import { ILoginResponse } from '../types/types';
import { comparePassword, generateToken, hashPassword } from '../auth';


class UserService {
  static async login(user: IUser): Promise<ILoginResponse> {
    console.log(user);
    const userObject = await UserRepository.findUser(user.userName)

    if (userObject == null) {
      return {
        message: 'User does not exist.',
        status: 404
      }
    }

    const isPasswordValid = await comparePassword(user.password, userObject.hashedPassword);
    if (!isPasswordValid) {
      return { message: 'Invalid credentials',
        status: 401
      }
    }

    const jwt = generateToken(user.userName);
    return{
      message: 'User Login successfully!',
      status: 200,
      token: jwt,
      isLogined: true,
      userId: userObject._id.toString()
    }
  }
  static async register(user: IUser): Promise<IRegisterResponse> {

    if (user.password == undefined){
      return {
        message: "Password is required.",
        status: 409,
      };
    }
    const hashedPassword= await hashPassword(user.password);
    const userRegister = {
      userName: user.userName,
      password: '',
      email: user.email,
      hashedPassword: hashedPassword,
    }
    const jwt = generateToken(user.userName)
    const userObject = await UserRepository.registerNewUser(userRegister)

    if(userObject == null) {
      return {
        message: "User with this name already exists.",
        status: 409,
      };
    }

    return{
      message: 'User registered successfully!',
      status: 200,
      token: jwt,
      isLogined: true,
      userId: userObject._id.toString()
    }

  }
}

export default UserService;