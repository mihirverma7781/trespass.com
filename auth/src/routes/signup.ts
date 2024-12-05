import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { signupValidator } from "./validators/validator";
import User from "../database/models/user";
import BadRequestError from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/signup",
  signupValidator(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const newUser = User.build({ email: email, password: password });
    await newUser.save();

    // GENERATE TOKEN
    const userToken = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_KEY!
    );

    // STORE IT TO COOKIES
    req.session = {
      jwt: userToken,
    };

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  }
);

export default router;
