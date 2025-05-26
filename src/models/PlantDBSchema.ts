import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPlantDBSchema extends Document {
  plantId: string;
  name: string;
  scientificName: string;
  humidity: number;
  temperature: number;
  height: number;
  img: string;
  recommendedTemperature: number;
  recommendedHumidity: number;
  plantInfo: string;
  userId?: string;
}

const plantSchema = new Schema<IPlantDBSchema>({
  plantId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  humidity: { type: Number, required: true },
  temperature: { type: Number, required: true },
  height: { type: Number, required: true },
  img: { type: String, required: true },
  recommendedTemperature: { type: Number, required: true },
  recommendedHumidity: { type: Number, required: true },
  plantInfo: { type: String, required: true },
  userId: { type: String, required: false }
});

const Plant: Model<IPlantDBSchema> = mongoose.model<IPlantDBSchema>('Plant', plantSchema, 'plants');

export default Plant;