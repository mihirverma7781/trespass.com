import { requireAuth } from "@mvtrespass/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/tickets", requireAuth, (req: Request, res: Response) => {
  res.status(200).send();
});

export default router;
