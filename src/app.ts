import "express-async-errors";
import "dotenv/config";
import express from "express";
import { handleErrors } from "./errors";
import { loginRoute, taskRoutes, userRoutes } from "./routes";

const app = express();
app.use(express.json());

app.use(loginRoute);
app.use(userRoutes);
app.use(taskRoutes);

app.use(handleErrors);

export default app;
