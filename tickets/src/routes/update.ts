import {
  BadRequestError,
  currentUser,
  NotFoundError,
  requireAuth,
  UnauthorizedError,
  validateRequest,
} from "@mvtrespass/common";
import express, { Request, Response } from "express";
import { updateTicketValidator } from "./validators/validators";
import Ticket from "../database/models/ticket";
import natsInstance from "../events/nats-wrapper";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";

const router = express.Router();

router.put(
  "/:id",
  currentUser,
  requireAuth,
  updateTicketValidator(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price, quantity } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }

    const updateTicket = await Ticket.findByIdAndUpdate(
      id,
      { title, price, quantity },
      { new: true }
    );

    if (!updateTicket) {
      throw new NotFoundError();
    }

    await new TicketUpdatedPublisher(natsInstance.client).publish({
      id: updateTicket.id,
      title: updateTicket.title,
      price: updateTicket.price,
      quantity: updateTicket.quantity,
      userId: updateTicket.userId,
    });

    res.status(200).json({
      message: "Ticket updated successfully",
      data: updateTicket,
    });
  }
);

export default router;
