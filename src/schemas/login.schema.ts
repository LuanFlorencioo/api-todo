import { user } from "./user.schemas";

const loginSchema = user.pick({
  nickname: true,
  password: true
})

export default loginSchema;