import { INote, IResponse} from '../types/types';
import NoteRepository from '../repositories/NoteRepository';
import NoteDBSchema, { INoteDBSchema } from '../models/NoteDBSchema';

class NoteService {
  static async createNote(note : INote): Promise<INote> {
    const NoteDBInstance = new NoteDBSchema({
        userId : note.userId,
        content : note.content,
        title: note.title,
        color: note.color,
      }
    )
    return NoteRepository.createNote(NoteDBInstance)
  }
  static async getAllNoteByUserId(userId: string): Promise<IResponse | INote> {
    const noteList = await NoteRepository.getAllNotesByUserId(userId)
    if (!noteList) {
      return {
        message: 'No notes found.',
        status: 404
      }
    } else{
      return noteList
    }
  }
  static async deleteNoteById(id: string): Promise<IResponse | undefined > {
    console.log(id);
    const result = await NoteRepository.deleteNote(id)
    console.log(result)
    if (!result) {
      return {
        message: 'No notes found.',
        status: 404
      }
    }
    else{
      return result
    }
  }
  static async updateNote(note : INote): Promise<IResponse> {
    const result = await NoteRepository.updateNote(note)
    if (!result) {
      return {
        message: 'Note not updated',
        status: 404
      }
    }
    else{
      return result
    }
  }

}

export default NoteService;