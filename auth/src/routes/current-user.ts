import express, { Request, Response } from "express";
const router = express.Router();
import { currentUser } from "@mvtrespass/common";

router.get("/currentuser", currentUser, async (req: Request, res: Response) => {
  const currentUser = req.currentUser;

  return res.status(200).json({
    message: currentUser ? "Authorization successfull" : "Authorization failed",
    data: {
      currentUser: currentUser || null,
    },
  });
});

export default router;
