import { Request, Response } from "express";
import { iLogin } from "../interfaces";
import { login } from "../services";

const loginController = async (req: Request, res: Response): Promise<Response> => {
  const loginData: iLogin = req.body;
  const token: string = await login(loginData);
  return res.json({ token });
}

export default loginController;