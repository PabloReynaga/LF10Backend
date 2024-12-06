import { ICreatedNote, INote } from '../types/types';
import NoteDBSchema, { INoteDBSchema } from '../models/NoteDBSchema';

class NoteRepository{
  static async createNote( note : INote): Promise< any> {
    try{
      return await new NoteDBSchema(note).save();
    }catch (error){
      console.error("Database Error:", error);
      throw new Error("Error creating a new note");
    }
  }
  static async getAllNotesByUserId(userId: string): Promise<any> {
    try{
      const resp = await NoteDBSchema.find({userId: userId});
      return resp
    } catch (error){
      console.error("Database Error:", error);
      throw new Error("Error getting notes from database");
    }
  }
  static async deleteNote(noteId: string): Promise<any> {
    try{
      return await NoteDBSchema.deleteOne({_id: noteId});
    } catch (error){
      console.error("Database Error:", error);
      throw new Error("Error getting notes from database");
    }
  }

  static async updateNote(note : any): Promise<any> {
    try{
      return await NoteDBSchema.findByIdAndUpdate(
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

export default NoteRepository;