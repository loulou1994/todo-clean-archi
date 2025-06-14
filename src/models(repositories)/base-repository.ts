import { ObjectLiteral, QueryFailedError, Repository } from "typeorm";
import { DatabaseError } from "pg-protocol";

import { DatabaseError as CustomDatabaseError } from "../schemas/errors/db";

import {
  DatabaseConnectionError,
  DuplicateEntityError,
  EntityNotFoundError,
  QueryError,
  RequiredFieldError,
  ValidationError,
} from "../schemas/errors/db";

export abstract class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(protected repositoryDep: Repository<T>){
    this.repository = repositoryDep
  }
  
  protected async executeQuery<R>(action: () => Promise<R>): Promise<R> {
    try {
      return await action();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected handleError(error: unknown): Error {
    if (error instanceof QueryFailedError) {
      const dbError = error.driverError as DatabaseError;

      console.log(`DB error:\n${{ ...dbError }}`);

      switch (dbError.code) {
        // Unique violation
        case "23505":
          return new DuplicateEntityError(dbError.where!, dbError.column!);
        // Foreign key violation
        case "23503":
          return new EntityNotFoundError(dbError.table!, dbError.where!);
        // Not null violation
        case "23502":
          return new RequiredFieldError(dbError.column!);
        // Check constraint violation
        case "23514":
          return new ValidationError(dbError.column!, dbError.where!);

        // Connection failure
        case "08006": 
          return new DatabaseConnectionError(dbError.detail!);

        default:
          return new QueryError(dbError.detail!);
      }
    }
    return new CustomDatabaseError(
      (error as Error).message
    );
  }
}
