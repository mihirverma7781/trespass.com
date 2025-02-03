import { currentUser, requireAuth, validateRequest } from "@mvtrespass/common";
import express, { Request, Response } from "express";
import { newTicketValidator } from "./validators/validators";
import natsInstance from "../events/nats-wrapper";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {});

router.get("/:id", (req: Request, res: Response) => {});

export default router;
