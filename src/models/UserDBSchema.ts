import mongoose, { Document, Schema , Model } from 'mongoose';

export interface IUserDBSchema extends Document {
  userName: string;
  email: string;
  hashedPassword: string;
  plants: [];
  _id: string;
}

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  plants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }]
});

const User: Model<IUserDBSchema> = mongoose.model<IUserDBSchema>('User', userSchema, 'users');
export default User;