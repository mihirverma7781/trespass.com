import { currentUser, requireAuth, validateRequest } from "@mvtrespass/common";
import express, { Request, Response } from "express";
import { newTicketValidator } from "./validators/validators";

const router = express.Router();

router.post(
  "/create",
  currentUser,
  requireAuth,
  newTicketValidator(),
  validateRequest,
  (req: Request, res: Response) => {
    return res.status(201).json({
      message: "test",
    });
  }
);

export default router;
