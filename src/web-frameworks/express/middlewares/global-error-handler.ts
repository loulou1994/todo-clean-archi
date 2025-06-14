import type { NextFunction, Request, Response } from "express";

import { InputParseError } from "../../../schemas/errors/inputs";
import {
  DatabaseError,
} from "../../../schemas/errors/db";


export const errorHandler = (
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const error = new Error("Unhandled exception thrown");
  let statusCode = 500;

  if (err instanceof InputParseError || err instanceof DatabaseError) {
    error.message = err.message; // or err.cause to check original error
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({ message: error.message, code: statusCode });  
};
