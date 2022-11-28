import bcrypt from 'bcryptjs';
import { AppError } from '../exceptions/AppError';
import { HttpCode } from '../models/HttpCode';

const saltRounds = 10;

export const passwordCompare = (plainPassword: string, hashPassword: string) => {
	const isMatch = bcrypt.compareSync(plainPassword, hashPassword);
	if (!isMatch) {
		console.info("Password doesn't match!")
		throw new AppError({
				httpCode: HttpCode.UNAUTHORIZED,
				description: 'invalid credentials',
			});
	} else {
		console.info("Password matches!")
	}
}

export const passwordCrypt = (password: string) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	console.log(hash)

	return hash;
}
