import { currentUser, requireAuth, validateRequest } from "@mvtrespass/common";
import express, { Request, Response } from "express";
import { newTicketValidator } from "./validators/validators";
import natsInstance from "../events/nats-wrapper";

const router = express.Router();

router.post("/create", (req: Request, res: Response) => {});

export default router;
