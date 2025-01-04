import {
  BadRequestError,
  currentUser,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@mvtrespass/common";
import express, { Request, Response } from "express";
import { newTicketValidator } from "./validators/validators";
import Ticket from "../database/models/ticket";

const router = express.Router();

router.get(
  "/:id",
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError();
    }

    return res.status(200).json({
      message: "Ticket fetched successfully",
      data: ticket,
    });
  }
);

router.get(
  "/",
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const tickets = await Ticket.find();

    if (!tickets) {
      throw new NotFoundError();
    }

    return res.status(200).json({
      message: "Tickets fetched successfully",
      data: tickets,
    });
  }
);

export default router;
