import {
	StatusCodes,
} from 'http-status-codes';

import { CustomError } from './custom-error';

type InputParseErrorOptions = {
  cause?: Record<string, string[] | undefined>;
};

export class InputParseError extends CustomError {
  cause?: InputParseErrorOptions["cause"];
  statusCode: number;
  
  constructor(message: string, options: InputParseErrorOptions) {
    super(message);
    this.statusCode = StatusCodes.BAD_GATEWAY

    if (options?.cause) {
      this.cause = options.cause;
    }
  }
}
