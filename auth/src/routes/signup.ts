import express, { Request, Response } from "express";
import { signupValidator } from "./validators/validator";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post("/signup", signupValidator(), (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  const { email, password } = req.body;
  throw new DatabaseConnectionError();

  return res.status(200).send("Hi there");
});

export default router;
