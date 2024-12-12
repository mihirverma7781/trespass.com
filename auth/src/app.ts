import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import {
  CurrentUserRouter,
  SigninRouter,
  SignoutRouter,
  SignupRouter,
} from "./routes";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

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

export default app;
