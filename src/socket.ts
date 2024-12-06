import { Server, Socket } from 'socket.io';
import { verifyToken } from './auth';

export const configureSocket = (io: Server) => {
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const decoded = verifyToken(token);
      (socket as any).user = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('User connected', (socket as any).user);

    socket.on('message', (msg: string) => {
      console.log(`Message from ${ (socket as any).user.userId }: ${msg}`);
      socket.emit('message', `Server received: ${msg}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};