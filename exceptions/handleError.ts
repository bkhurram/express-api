import { Response } from "express";
import { HttpCode } from "../models/HttpCode";
import { AppError } from "./AppError";

const isTrustedError = (error: Error): boolean => {
	if (error instanceof AppError) {
		return error.isOperational;
	}

	return false;
}

const handleTrustedError = (error: AppError, response: Response): void => {
	response.status(error.httpCode).json({
		code: error.httpCode,
		message: error.message
	});
}

const handleCriticalError = (error: Error | AppError, response?: Response): void => {
	if (response) {
		response
			.status(HttpCode.INTERNAL_SERVER_ERROR)
			.json({ code: 500, message: 'Internal server error' });
	}

	console.log('Application encountered a critical error. Exiting');
	process.exit(1);
}

export const handleError = (error: Error | AppError, response?: Response): void => {
	if (isTrustedError(error) && response) {
		handleTrustedError(error as AppError, response);
	} else {
		handleCriticalError(error, response);
	}
}

