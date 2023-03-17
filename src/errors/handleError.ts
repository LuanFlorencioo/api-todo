import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "./AppError";

const handleErrors = (error: any, req: Request, res: Response, _: NextFunction): Response => {
  if (error instanceof AppError) {
    const { statusCode, message } = error;
    return res.status(statusCode).json({ message });
  }

  if (error instanceof ZodError) {
    const message = error.flatten().fieldErrors;
    return res.status(400).json({ message });
  }

  console.error(error.message);
  const message = "Internal server error";
  return res.status(500).json({ message });
}

export default handleErrors;