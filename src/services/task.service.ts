import AppDataSource from "../data-source";
import { Repository } from "typeorm";
import { Task, User } from "../entities";
import { iCreateTask, iTask, iUserLogged } from "../interfaces";
import { taskSchema } from "../schemas";
import { findUser } from "./user.service";

const createTask = async (taskData: iCreateTask, userLogged: iUserLogged): Promise<iTask> => {
  const user: User = await findUser(userLogged);

  const taskRepo: Repository<Task> = AppDataSource.getRepository(Task);
  let task: Task | iTask = taskRepo.create({ ...taskData, user });
  task = await taskRepo.save(task);
  task = taskSchema.parse(task);

  return task;
}

const listTask = async (userLogged: iUserLogged): Promise<iTask[]> => {
  const taskRepo: Repository<Task> = AppDataSource.getRepository(Task);
  let tasks: iTask[] = await taskRepo.find({
    relations: { user: true },
    where: {
      user: {
        ...userLogged
      }
    }
  })

  tasks = taskSchema.array().parse(tasks);
  return tasks;
}

const handleCheckTask = async (taskId: number): Promise<iTask> => {
  const taskRepo: Repository<Task> = AppDataSource.getRepository(Task);
  let task: Task | iTask | null = await taskRepo.findOneBy({ id: taskId });

  task = await taskRepo.save({
    ...task,
    checked: !task!.checked
  });
  task = taskSchema.parse(task);

  return task;
}

const deleteTask = async (taskId: number): Promise<void> => {
  const taskRepo: Repository<Task> = AppDataSource.getRepository(Task);
  const task = await taskRepo.findOneBy({ id: taskId });
  await taskRepo.remove(task!);
}

export {
  createTask,
  listTask,
  handleCheckTask,
  deleteTask
}