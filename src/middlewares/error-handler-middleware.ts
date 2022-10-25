import { NextFunction, Request, Response } from "express";
import { BaseError } from "../exception-handling/base-error";

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
  if (error instanceof BaseError) {
    response.status(error.httpCode).send({ error: { name: error.name, message: error.message }});
  }
  if (error instanceof Error) {
    response.status(500).send({ error: { name: error.name, message: error.message }});
  }
}