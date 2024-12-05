import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import BadRequestError from "../errors/bad-request-error";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
const router = express.Router();

router.get("/currentuser", currentUser, async (req: Request, res: Response) => {
  const currentUser = req.currentUser;

  return res.status(200).json({
    message: "Authorization successfull",
    data: {
      currentUser: currentUser || null,
    },
  });
});

export default router;
