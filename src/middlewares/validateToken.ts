import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

const validateToken = async (req: Request, _: Response, next: NextFunction): Promise<Response | void> => {
  const headersAuth: string | undefined = req.headers.authorization;
  if (!headersAuth) throw new AppError("Missing bearer token", 401);

  const token = headersAuth.replace("Bearer ", "");
  const secretKey = process.env.SECRET_KEY!;

  jwt.verify(
    token,
    secretKey,
    (error, decoded: any) => {
      if (error) throw new AppError(error.message, 401);

      const { id, username, nickname } = decoded;
      req.userLogged = { id, username, nickname };

      return next();
    }
  )
}

export default validateToken;