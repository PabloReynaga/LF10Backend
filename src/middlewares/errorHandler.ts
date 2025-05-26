import { Response } from "express";

const successResponse = (res: Response, data: object, message='Success') => {
  return res.status(200).json({
    success: true,
    message: message,
    data: data,
  })
}

const errorResponse = (res: Response, status:number, message: string) => {
  return res.status(status).json({
    success: false,
    message: message,
  })
}

class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

class ConflictError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

export { successResponse, errorResponse, ConflictError, NotFoundError , UnauthorizedError };