import { BaseError } from "../base-error";
import { ErrorName } from '../error-name';
import { HttpStatusCode } from "../http-status-code";

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(ErrorName.Unauthorized, HttpStatusCode.UNAUTHORIZED, message);
  }
 }