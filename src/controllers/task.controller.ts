import { Request, Response } from "express";
import { iCreateTask, iTask, iUserLogged } from "../interfaces";
import { createTask, handleCheckTask, listTask, deleteTask } from "../services";

const createTaskController = async (req: Request, res: Response): Promise<Response> => {
  const taskData: iCreateTask = req.body;
  const userLoggedData: iUserLogged = req.userLogged;
  const taskCreated: iTask = await createTask(taskData, userLoggedData);
  return res.status(201).json(taskCreated);
}

const listTasksController = async (req: Request, res: Response): Promise<Response> => {
  const userLoggedData: iUserLogged = req.userLogged;
  const userTasks: iTask[] = await listTask(userLoggedData);
  return res.status(200).json(userTasks);
}

const handleCheckTaskController = async (req: Request, res: Response): Promise<Response> => {
  const taskId: number = +req.params.id;
  const taskChanged: iTask = await handleCheckTask(taskId);
  return res.status(200).json(taskChanged);
}

const deleteTaskController = async (req: Request, res: Response): Promise<Response> => {
  const taskId: number = +req.params.id;
  await deleteTask(taskId);
  return res.status(204).json();
}

export {
  createTaskController,
  listTasksController,
  handleCheckTaskController,
  deleteTaskController
}