import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { iCreateUser, iUserLogged, iUserReturn } from "../interfaces";
import { userReturnSchema } from "../schemas";

const createUser = async (userData: iCreateUser): Promise<iUserReturn> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const { nickname } = userData;

  const isExistsNickname: boolean = await userRepo.exist({
    where: { nickname }
  })
  if (isExistsNickname) throw new AppError("Already exists nickname", 409);

  let user: User | iUserReturn = userRepo.create(userData);
  await userRepo.save(user);
  user = userReturnSchema.parse(user);

  return user;
}

const findUser = async (userLogged: iUserLogged): Promise<User> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const user: User | null = await userRepo.findOne({
    where: { ...userLogged }
  });
  if (!user) throw new AppError("User not exist", 404);

  return user;
}

export {
  createUser,
  findUser
}