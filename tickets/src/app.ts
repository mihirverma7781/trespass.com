import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import {
  currentUser,
  errorHandler,
  NotFoundError,
  requireAuth,
} from "@mvtrespass/common";
import { CreateTicketRouter } from "./routes";

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
app.use("/api/tickets", CreateTicketRouter);

app.get("/api/tickets/health-check", (req, res) => {
  return res.status(200).json({
    message: "Tickets Server Running",
  });
});

app.get("*", async () => {
  throw new NotFoundError();
});

// Error Middleware
app.use(errorHandler);

export default app;
