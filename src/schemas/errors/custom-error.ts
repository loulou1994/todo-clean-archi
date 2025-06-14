export abstract class CustomError extends Error {
  public abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }
}
  