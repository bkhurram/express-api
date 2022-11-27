const client = require('../config/database');
const { passwordCrypt } = require('./PassworService');

class UserService {

	collection = null;

	constructor() {
		const db = client.getDb();
		this.collection = db.collection('users');
	}

	async getAll() {

		const findResult = await this.collection.find({}).toArray();
		console.log('Found users documents =>', findResult);

		return findResult;
	}

	async store(user) {
		user.password = await passwordCrypt(user.password);
		delete user.passwordConfirmation;

		await this.collection.insertOne(user);
	}
}

module.exports = UserService;
