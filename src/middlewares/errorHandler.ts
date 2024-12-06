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

export { successResponse, errorResponse };