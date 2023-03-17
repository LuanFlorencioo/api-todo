import { Router } from "express";
import { loginController } from "../controllers";
import { validateBodyReq } from "../middlewares";
import { loginSchema } from "../schemas";

const loginRoute: Router = Router();

loginRoute.post("", validateBodyReq(loginSchema), loginController);

export default loginRoute;