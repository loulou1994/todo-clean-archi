import { Request, Response, NextFunction } from "express"

// to retrieve the response body for the error log
export const overwriteResponseSend = (_: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send

    res.send = function (...args) {
        res.body = args[0] // the first argument is the response body
        return originalSend.apply(res, args)
    };
    
    next();
}