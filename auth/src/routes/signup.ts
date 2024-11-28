import express, { Request, Response } from "express";
import { signupValidator } from "./validators/validator";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import User from "../database/models/user";
import BadRequestError from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/signup",
  signupValidator(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const newUser = User.build({ email: email, password: password });
    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  }
);

export default router;
