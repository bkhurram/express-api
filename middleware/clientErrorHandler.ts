import { NextFunction, Request, Response } from "express";
import { handleError } from "../exceptions/handleError";

export const clientErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	handleError(err, res);
}
