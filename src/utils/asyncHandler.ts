import type { NextFunction } from "express";

function asyncHandler(fn) {
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
