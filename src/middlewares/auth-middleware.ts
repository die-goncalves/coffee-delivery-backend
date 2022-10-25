import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { ErrorName } from "../exception-handling/error-name";
import { HttpStatusCode } from "../exception-handling/http-status-code";

export function checkAuthMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response 
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ name: ErrorName.JsonWebTokenError, message: 'Token not present.' })
  }

  const [, token] = authorization.split(' ');
  if (!token) {
    return response 
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ name: ErrorName.JsonWebTokenError, message: 'Token not present.' })
  }

  try {
    const decoded = jwt.verify(token as string, 'super-secret');
    request.customer = decoded.sub as string;
    
    return next();
  } catch (error) {
    if(error instanceof TokenExpiredError) {
      return response 
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ name: ErrorName.TokenExpiredError, message: error.message })
    }
    if(error instanceof Error) {
      return response 
        .status(HttpStatusCode.INTERNAL_SERVER)
        .json({ name: ErrorName.InternalServerError, message: error.message })
    }
  }
}
