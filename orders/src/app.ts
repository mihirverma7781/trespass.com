import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import {
  currentUser,
  errorHandler,
  NotFoundError,
  requireAuth,
} from "@mvtrespass/common";
import { CreateOrderRouter, DeleteOrderRouter, GetOrderRouter } from "./routes";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.get("/api/orders/health-check", (req, res) => {
  return res.status(200).json({
    message: "Orders Server Running",
  });
});

// Server Middlewares
app.use("/api/orders", CreateOrderRouter);
app.use("/api/orders", GetOrderRouter);
app.use("/api/orders", DeleteOrderRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

// Error Middleware
app.use(errorHandler);

export default app;
