import "express-async-errors";
import "dotenv/config";
import express from "express";
import { handleErrors } from "./errors";
import { loginRoute, taskRoutes, userRoutes } from "./routes";

const app = express();
app.use(express.json());

app.use("/login", loginRoute);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.use(handleErrors);

export default app;
