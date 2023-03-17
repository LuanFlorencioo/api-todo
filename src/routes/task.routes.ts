import { Router } from "express";
import {
  createTaskController,
  handleCheckTaskController,
  listTasksController,
  deleteTaskController
} from "../controllers";
import { ensuresTask, validateBodyReq, validateToken } from "../middlewares";
import { createTaskSchema } from "../schemas";

const taskRoutes: Router = Router();

taskRoutes.post("", validateToken, validateBodyReq(createTaskSchema), createTaskController);
taskRoutes.get("", validateToken, listTasksController);
taskRoutes.patch("/:id", validateToken, ensuresTask, handleCheckTaskController);
taskRoutes.delete("/:id", validateToken, ensuresTask, deleteTaskController);

export default taskRoutes;