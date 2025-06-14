import type { Request, Response } from "express";

import { HttpRequest, IController } from "../../shared/controller-interface";

export const makeExpressCallback = <TResponse>(controller: IController<TResponse>) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      path: req.path,
      method: req.method,
      headers: req.headers,
    };
    
    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.cookies) {
      httpResponse.cookies.forEach((cookie) =>
        res.cookie(cookie.name, cookie.value, cookie.options)
      );
    }
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
