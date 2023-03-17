import { z } from "zod";
import { taskSchema, createTaskSchema } from "../schemas";

type iTask = z.infer<typeof taskSchema>;
type iCreateTask = z.infer<typeof createTaskSchema>;

export {
  iTask,
  iCreateTask
}