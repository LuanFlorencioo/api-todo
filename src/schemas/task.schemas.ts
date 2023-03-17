import { z } from "zod";

const taskSchema = z.object({
  id: z.number(),
  title: z.string().max(40),
  checked: z.boolean().optional().default(false),
  createdAt: z.date(),
  updatedAt: z.date()
});

const createTaskSchema = taskSchema.omit({ id: true, createdAt: true, updatedAt: true });

export {
  taskSchema,
  createTaskSchema,
}