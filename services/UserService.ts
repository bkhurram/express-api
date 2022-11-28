import { passwordCrypt, passwordCompare } from './PassworService';
import { NewUserType, UserType, UserSignType } from '../types/User';
import User from '../entity/User';
import { AppError } from '../exceptions/AppError';
import { HttpCode } from '../models/HttpCode';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/UserModel';
import SignUserModel from '../models/SignUserModel';
import { JwtPayloadData } from '../types/JwtPayloadData';

dotenv.config();

const apisecret = process.env.API_SECRET || '';

class UserService {

	collection: any = null;

	constructor() {
		//const db = client.getDb();
		//this.collection = db.collection('users');
	}

	async getAll() {
		const projection = { _id: 0, password: 0 };
		const findResult: UserType[] = await User.find({}, projection);
		console.log('Found users documents =>', findResult);

		return findResult;
	}

	async store(user: NewUserType) {
		const newUser = new User({
			...user,
			password: passwordCrypt(user.password)
		});

		try {
			await newUser.save();
		} catch (err) {

			throw new AppError({
				httpCode: HttpCode.INTERNAL_SERVER_ERROR,
				description: 'Fail user registration',
			});
		}
	}

	async signin(sign: UserSignType) {
		const user = await User.findOne({ email: sign.email });
		console.log("signin result", user);

		if (!user) {
			throw new AppError({
				httpCode: HttpCode.UNAUTHORIZED,
				description: 'invalid credentials',
			});
		}

		passwordCompare(sign.password, user.password);

		//signing token with user id
		const jwtPayload: JwtPayloadData = { email: user.email, id: user._id };
		var token = jwt.sign(jwtPayload, apisecret, {
			expiresIn: 86400
		});

		return new SignUserModel(token, user.email, user.name, user.surname, user.birthday);
	}
}

export default UserService;
