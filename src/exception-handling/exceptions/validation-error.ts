import { BaseError } from "../base-error";
import { ErrorName } from '../error-name';

export class ValidationError extends BaseError {
  constructor(httpCode: number, message: string) {
    super(ErrorName.ValidationError, httpCode, message);
  }
 }
 