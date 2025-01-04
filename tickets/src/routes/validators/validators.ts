import { body } from "express-validator";

const newTicketValidator = () => {
  return [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({
        gt: 0,
      })
      .withMessage("Price must be greater than 0"),
    body("quantity")
      .isFloat({
        gt: 0,
      })
      .withMessage("Quantity must be greater than 0"),
  ];
};

const updateTicketValidator = () => {
  return [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({
        gt: 0,
      })
      .withMessage("Price must be greater than 0"),
    body("quantity")
      .isFloat({
        gt: 0,
      })
      .withMessage("Quantity must be greater than 0"),
  ];
};

export { newTicketValidator, updateTicketValidator };
