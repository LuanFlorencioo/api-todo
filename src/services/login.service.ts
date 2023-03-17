import "dotenv/config";
import AppDataSource from "../data-source";
import jwt from "jsonwebtoken";
import { User } from "../entities";
import { Repository } from "typeorm";
import { compare } from "bcryptjs";
import { iLogin } from "../interfaces";
import { AppError } from "../errors";

const comparePassword = async (payloadPassword: string, validPassword: string): Promise<void> => {
  const isValidPassword: boolean = await compare(payloadPassword, validPassword);

  if (!isValidPassword) throw new AppError("Invalid credentials", 401);
}

const createToken = (user: User): string => {
  const secretKey: string = process.env.SECRET_KEY!;

  const { id, nickname, username } = user;
  const jwtData = { id, nickname, username };
  const options = {
    expiresIn: process.env.EXPIRES_IN || '24h',
    subject: `${id}`
  }

  const token: string = jwt.sign(jwtData, secretKey, options);
  return token;
}

const login = async (loginData: iLogin): Promise<string> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const user: User | null = await userRepo.findOneBy({ nickname: loginData.nickname });
  if (!user) throw new AppError("Invalid credentials", 401);

  await comparePassword(loginData.password, user.password);

  const token: string = createToken(user);
  return token;
}

export default login;