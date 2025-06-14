import {
	StatusCodes,
} from 'http-status-codes';

import { CustomError } from './custom-error';

export class DatabaseError extends CustomError {
  statusCode: number;

  constructor(originalMessage: string) {
    super(`Error at the database level with the following message:\n${originalMessage}`);
    this.name = "DatabaseError";
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
}

export class EntityNotFoundError extends DatabaseError {
  constructor(entityName: string, identifier: string | number) {
    super(`The entered ${entityName} id: ${identifier} is not found`);
    this.name = "EntityNotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export class DuplicateEntityError extends DatabaseError {
  constructor(field: string, value: string) {
    super(`The value ${value} on ${field} field already exists`);
    this.name = "DuplicateEntityError";
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export class RequiredFieldError extends DatabaseError {
  constructor(field: string) {
    super(`The ${field} field is required`);
    this.name = "RequiredFieldError";
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export class ValidationError extends DatabaseError {
  constructor(field: string, value: number | string) {
    super(`The value (${value}) entered into ${field} field is not valid`);
    this.name = "ValidationError";
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export class DatabaseConnectionError extends DatabaseError {
  constructor(detail: string) {
    super(`Database connection error. More info:\n${detail}`);
    this.name = "DatabaseConnectionError";
    this.statusCode = StatusCodes.BAD_GATEWAY
  }
}

export class QueryError extends DatabaseError {
  constructor(detail: string) {
    super(`Query execution error:\n${detail}`);
    this.name = "QueryError";
    this.statusCode = StatusCodes.BAD_GATEWAY
  }
}