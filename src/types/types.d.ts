export interface ILoginResponse{
  message: string;
  status: number;
  token?: string;
  isLogined?: boolean;
  userId?: string;
}

export interface IRegisterResponse{
  message: string;
  status: number;
  token?: string;
  isLogined?: boolean;
  userId?: string;
}

export interface IResponse{
  message: string;
  status: number;
}

export interface IUser {
  userName: string;
  email: string;
  password: string;
  plants: any;
  hashedPassword?: string;
}

export interface INote {
  userId: string;
  content: string;
  color: string;
  title: string;
}

export interface ICreatedNote extends INote{
  _id: string;
}