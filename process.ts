// src/process.ts
import { handleError } from "./exceptions/handleError";

process.on('uncaughtException', (error: Error) => {
	console.log(`Uncaught Exception: ${error.message}`);
	handleError(error);
});
