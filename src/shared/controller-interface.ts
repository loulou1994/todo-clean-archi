import { type CookieOptions } from "express";

type Cookie = {
  options: CookieOptions;
  name: string;
  value: string;
}

export type HttpRequest = {
  body?: unknown;
  query?: Record<string, unknown>;
  params?: Record<string, string>;
  method: string;
  path: string;
  headers: Record<string, unknown>;
};

export type HttpResponse<T=undefined> = {
  statusCode: number;
  body?: T;
  cookies?: Cookie[];
  headers?: Record<string, unknown>;
};

export interface IController<TResponse = undefined> {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse<TResponse>>;
}