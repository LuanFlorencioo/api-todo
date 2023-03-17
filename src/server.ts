import app from "./app";
import AppDataSource from "./data-source";

const initServer = () => {
  const port = process.env.PORT || 3000;
  const showSuccessMessage = (): void => console.log("🟢 Server is running...");
  app.listen(port, showSuccessMessage);
}

AppDataSource.initialize()
  .then(initServer)
  .catch((error) => console.error(error));
