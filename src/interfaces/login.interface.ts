import { z } from "zod";
import { loginSchema } from "../schemas";

type iLogin = z.infer<typeof loginSchema>;

interface iUserLogged {
  id: number
  username: string
  nickname: string
}

export {
  iLogin,
  iUserLogged
}