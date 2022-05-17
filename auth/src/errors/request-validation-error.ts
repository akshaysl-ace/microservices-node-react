import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters!');
        //only beacause we are extending built-in class, we need to use following code ->
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    statusCode = 400;

    serializeErrors() {
        return this.errors.map(error => {
            return { message: error.msg, field: error.param }
        });
    }
}