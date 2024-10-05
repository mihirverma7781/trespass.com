import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Error occurred while validating request");

    // Only because extending built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const formattedErrors = this.errors.map((err) => {
      return {
        message: err.msg,
        field: err.type === "field" ? err?.path : null,
      };
    });

    return formattedErrors;
  }
}
