import { Request, Response, NextFunction } from 'express';
import NoteService from '../services/NoteService';

class NoteController{
  static async createNote(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await NoteService.createNote(req.body);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: 'Internal server error.'});
    }
  }
  static async getAllNotesByUserId(req:Request, res :Response): Promise<any> {
    try{
      const resp = await NoteService.getAllNoteByUserId(req.params.id);
      res.status(200).json(resp);
    }catch(error){
      console.log(error);
      return res.status(500).json({message: 'Internal server error.'});
    }
  }
  static async deleteNote(req: Request, res: Response): Promise<any> {
    try{
      const resp = await NoteService.deleteNoteById(req.params.id);
      res.status(200).json(resp);
    }catch(error){
      console.log(error);
      return res.status(500).json({message: 'Internal server error.'});
    }
  }
  static async updateNote(req: Request, res: Response, next: NextFunction): Promise<any> {
    try{
      const resp = await NoteService.updateNote(req.body)
      res.status(200).json(resp);
    }catch(error){
      console.log(error);
      return res.status(500).json({message: 'Internal server error.'});
    }
  }

}

export default NoteController;