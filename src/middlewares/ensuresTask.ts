import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Task } from "../entities";
import { AppError } from "../errors";

const ensuresTask = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const taskId = +req.params.id;
  const userLogged = req.userLogged;

  const taskRepo: Repository<Task> = AppDataSource.getRepository(Task);

  const findTask: Task | null = await taskRepo.findOne({
    relations: { user: true },
    where: {
      id: taskId
    }
  })

  if (!findTask) throw new AppError("Task not found", 404);

  const isUserTask: boolean = findTask.user.nickname === userLogged.nickname;

  if (!isUserTask) throw new AppError("User does not have permission for this non-owned task", 403);

  return next();
}

export default ensuresTask;