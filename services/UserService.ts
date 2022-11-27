import client from '../config/database';
import { passwordCrypt } from './PassworService';
import { NewUserType, UserType } from '../types/User';

class UserService {

	collection: any = null;

	constructor() {
		const db = client.getDb();
		this.collection = db.collection('users');
	}

	async getAll() {
		const projection = { _id: 0, password: 0 };


		const findResult: UserType[] = await this.collection
			.find({})
			.project(projection)
			.toArray();
		console.log('Found users documents =>', findResult);

		return findResult;
	}

	async store(user: NewUserType) {
		user.password = await passwordCrypt(user.password);
		delete user.passwordConfirmation;

		await this.collection.insertOne(user);
	}
}

export default UserService;
