import { currentUser, requireAuth, validateRequest } from "@mvtrespass/common";
import express, { Request, Response } from "express";
import { newTicketValidator } from "./validators/validators";
import Ticket from "../database/models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import NatsWrapper from "../events/nats-wrapper";

const router = express.Router();
const natsInstance = NatsWrapper.getInstance();

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
    new TicketCreatedPublisher(natsInstance.client).publish({
      id: newTicket.id,
      title: newTicket.title,
      quantity: newTicket.quantity,
      price: Number(newTicket.price),
      userId: newTicket.userId,
    });
    res.status(201).json({
      message: "Ticket Added successfully",
      data: newTicket,
    });
  }
);

export default router;
