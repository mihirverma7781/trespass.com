import express from "express";
import "express-async-errors";
import {
  CurrentUserRouter,
  SigninRouter,
  SignoutRouter,
  SignupRouter,
} from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import AuthDatabase from "./database/connect-db";

const PORT = 8001;

const app = express();
app.use(express.json());

// Server Middlewares
app.use("/api/users", CurrentUserRouter);
app.use("/api/users", SigninRouter);
app.use("/api/users", SignoutRouter);
app.use("/api/users", SignupRouter);

app.get("/api/users/health-check", (req, res) => {
  return res.status(200).json({
    message: "Server Running",
  });
});

app.get("*", async () => {
  throw new NotFoundError();
});

// Error Middleware
app.use(errorHandler);

// Server Listener & Database Connection
const startServer = async () => {
  try {
    const databaseInstance = AuthDatabase.getInstance();
    await databaseInstance.connectDatabase();

    app.listen(PORT, () => {
      console.log(`Auth Service Listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
