import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { configureSocket } from './socket';
import dbConnection from './db/db.connection';
import cors from 'cors';
import PlantController from './controllers/PlantController';
import UserController from './controllers/UserController';
import { Request, Response, NextFunction } from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware';
import userController from "./controllers/UserController";


dotenv.config();
const db = dbConnection()

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};


const app = express();
const server = http.createServer(app);
app.use(cors(corsOptions));

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 3000;

configureSocket(io);

app.use(express.json());


app.post('/register', async (req:Request, res:Response, next:NextFunction) => {
  try{
    await UserController.registerUser(req,res,next)
  }catch (error){
    next(error);
  }
});

app.post('/login', async (req:Request, res:Response, next:NextFunction) => {
  try{
    await UserController.loginUser(req ,res, next)
  } catch (error) {
      next(error)
  }
});

app.get('/getAllPlants', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await PlantController.getAllPlants(req, res);
  } catch (error) {
    next(error);
  }
});

app.post('/initializeConversation', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userController.initializeConversation(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.post('/saveMessage', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userController.saveMessage(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.get('/getAllUsers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.getAllUsers(res, next);
  } catch (error) {
    next(error);
  }
});

app.get('/getConversationFromUsers/:conversationId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.getConversationFromUsers( req ,res, next);
  } catch (error) {
    next(error);
  }
});

app.get('/getAllPlantsByUserId/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.getAllPlantByUserId(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.post('/addPlantToUser', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.addPlantToUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.delete('/removePlantFromUser', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.removePlantFromUser(req, res, next);
  } catch (error) {
    next(error);
  }

})

app.use(errorMiddleware)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




