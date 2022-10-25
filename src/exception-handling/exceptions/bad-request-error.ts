import { BaseError } from "../base-error";
import { ErrorName } from '../error-name';
import { HttpStatusCode } from "../http-status-code";

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(ErrorName.BadRequest, HttpStatusCode.BAD_REQUEST, message);
  }
 }
 