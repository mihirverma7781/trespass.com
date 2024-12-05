import { body } from "express-validator";

const signupValidator = () => {
  return [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({
      min: 8,
      max: 20,
    }),
  ];
};

const signinValidator = () => {
  return [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({
      min: 8,
      max: 20,
    }),
  ];
};

export { signupValidator, signinValidator };
