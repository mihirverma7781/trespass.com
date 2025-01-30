import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import {
  currentUser,
  errorHandler,
  NotFoundError,
  requireAuth,
} from "@mvtrespass/common";
import {
  CreateTicketRouter,
  ShowTicketRouter,
  UpdateTicketRouter,
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

app.get("/api/tickets/health-check", (req, res) => {
  return res.status(200).json({
    message: "Tickets Server Running",
  });
});

// Server Middlewares
app.use("/api/tickets", CreateTicketRouter);
app.use("/api/tickets", ShowTicketRouter);
app.use("/api/tickets", UpdateTicketRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

// Error Middleware
app.use(errorHandler);

export default app;
