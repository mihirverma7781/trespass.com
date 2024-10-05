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

const PORT = 8001;

const app = express();
app.use(express.json());

// Server Middlewares
app.use("/api/users", CurrentUserRouter);
app.use("/api/users", SigninRouter);
app.use("/api/users", SignoutRouter);
app.use("/api/users", SignupRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

// Error Middleware
app.use(errorHandler);

// Server Listener
app.listen(PORT, () => {
  console.log(`Auth Service Listening on ${PORT}`);
});
