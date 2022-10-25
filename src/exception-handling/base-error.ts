import { ErrorName } from "./error-name";
import { HttpStatusCode } from "./http-status-code";

export class BaseError extends Error {
  public name: string;
  public httpCode: HttpStatusCode;
  public message: string = '';
  
  constructor(name: string = ErrorName.UnknownError, httpCode: HttpStatusCode, message: string = '') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  
    this.name = name;
    this.httpCode = httpCode;
    this.message = message;
  
    Error.captureStackTrace(this);
  }
}