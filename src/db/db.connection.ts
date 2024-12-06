import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_URI;

if (!connectionString) throw new Error('Missing Database Connection String')
const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString, {dbName: 'db'});
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectToDatabase;
