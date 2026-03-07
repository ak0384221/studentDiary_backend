import type { NextFunction, Request, RequestHandler, Response } from "express";

function asyncHandler(fn: RequestHandler) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(error.message);
      }
      console.log(error);
      return;
    }
  };
}

export { asyncHandler };
