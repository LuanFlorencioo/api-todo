import { Router } from "express";
import { validateBodyReq } from "../middlewares";
import { createUserSchema } from "../schemas";
import { createUserController } from "../controllers";

const userRoutes: Router = Router();

userRoutes.post("", validateBodyReq(createUserSchema), createUserController);

export default userRoutes;