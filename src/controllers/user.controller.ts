import { Request, Response } from "express";
import { iCreateUser, iUserReturn } from "../interfaces";
import { createUser } from "../services";

const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const userData: iCreateUser = req.body;
  const userCreated: iUserReturn = await createUser(userData);
  return res.status(201).json(userCreated);
}

export {
  createUserController
}