import { ICreatedNote, INote } from '../types/types';
import PlantDBSchema, { IPlantDBSchema } from '../models/PlantDBSchema';

class PlantRepository {

  static async getAllPlants(): Promise<any> {
    try {
      return await PlantDBSchema.find({});
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Error getting plants from database");
    }
  }

  static async createNote( note : INote): Promise< any> {
    try{
      return await new PlantDBSchema(note).save();
    }catch (error){
      console.error("Database Error:", error);
      throw new Error("Error creating a new note");
    }
  }
  static async getAllNotesByUserId(userId: string): Promise<any> {
    try{
       return await PlantDBSchema.find({userId: userId});
    } catch (error){
      console.error("Database Error:", error);
      throw new Error("Error getting notes from database");
    }
  }
  static async deleteNote(noteId: string): Promise<any> {
    try{
      return await PlantDBSchema.deleteOne({_id: noteId});
    } catch (error){
      console.error("Database Error:", error);
      throw new Error("Error getting notes from database");
    }
  }

  static async updateNote(note : any): Promise<any> {
    try{
      return await PlantDBSchema.findByIdAndUpdate(
        note._id,
          {
            title: note.title,
            content: note.content,
            color: note.color
          },
          { new: true }
      )
    }
    catch (error){
      console.error("Database Error:", error);
      throw new Error("Error updating notes from database");
    }
  }
}

export default PlantRepository;