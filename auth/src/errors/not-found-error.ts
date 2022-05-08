import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {

    constructor() {
        super('Sorry, Route not found !');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    statusCode = 404;

    serializeErrors() {
        return [
            { message: 'Route not Found !' }
        ]
    }
}