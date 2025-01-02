import { currentUser, requireAuth, validateRequest } from "@mvtrespass/common";
import express, { Request, Response } from "express";
import { newTicketValidator } from "./validators/validators";
import Ticket from "../database/models/ticket";

const router = express.Router();

router.post(
  "/create",
  currentUser,
  requireAuth,
  newTicketValidator(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price, quantity } = req.body;

    const newTicket = Ticket.build({
      title,
      price,
      quantity,
      userId: req.currentUser!.id,
    });
    await newTicket.save();

    res.status(201).json({
      message: "Ticket Added successfully",
      data: newTicket,
    });
  }
);

export default router;
