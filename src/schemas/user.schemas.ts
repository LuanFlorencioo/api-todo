import { z } from "zod";
import { taskSchema } from "./task.schemas";

const user = z.object({
  id: z.number(),
  username: z.string().min(3).max(40),
  nickname: z.string().min(3).max(40),
  password: z.string().min(4).max(20),
  createdAt: z.date(),
  tasks: z.array(taskSchema)
})

const createUserSchema = user.omit({ id: true, createdAt: true, tasks: true });

const userReturnSchema = user.omit({ password: true, tasks: true });

export {
  user,
  createUserSchema,
  userReturnSchema,
}