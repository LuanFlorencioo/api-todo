import { z } from "zod";
import { user, createUserSchema, userReturnSchema } from "../schemas";

type iUser = z.infer<typeof user>;
type iCreateUser = z.infer<typeof createUserSchema>;
type iUserReturn = z.infer<typeof userReturnSchema>;

export {
  iUser,
  iCreateUser,
  iUserReturn
}