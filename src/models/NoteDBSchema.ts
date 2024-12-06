import mongoose, { Document, Schema , Model } from 'mongoose';


export interface INoteDBSchema extends Document {
  userId: string;
  content: string;
  color: string;
  title: string;
}

const noteSchema = new Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  color: { type: String, required: true },
  title: { type: String, required: true}

});

const Note: Model<INoteDBSchema> = mongoose.model<INoteDBSchema>('Note', noteSchema, 'notes');
export default Note;