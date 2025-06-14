// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Response } from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Response {
    body?: unknown;
  }
}