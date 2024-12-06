import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (user: string): string => {
  return jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET_KEY);
};