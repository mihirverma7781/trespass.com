import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { signinValidator } from "./validators/validator";
import User from "../database/models/user";
import BadRequestError from "../errors/bad-request-error";
import { Password } from "../utils/password";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/signin",
  signinValidator(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      throw new BadRequestError("Invalid login credentials");
    }

    const passwordsMatch = await Password.compare(userExist.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid login credentials");
    }

    // GENERATE TOKEN
    const userToken = jwt.sign(
      {
        id: userExist.id,
        email: userExist.email,
      },
      process.env.JWT_KEY!
    );

    // STORE IT TO COOKIES
    req.session = {
      jwt: userToken,
    };

    return res.status(200).json({
      message: "User logged in successfully",
      data: userExist,
    });
  }
);

export default router;
