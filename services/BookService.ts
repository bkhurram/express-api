import { BookType } from '../types/Book';
import Book from '../entity/Book';
import { AppError } from '../exceptions/AppError';
import { HttpCode } from '../models/HttpCode';


class BookService {

	collection: any = null;

	constructor() {
		//const db = client.getDb();
		//this.collection = db.collection('users');
	}

	async getAll() {

		const findResult: BookType[] = await Book.find({});
		console.log('Found book documents =>', findResult);
		return findResult;
	}

	async store(book: BookType) {
		try {
			await new Book(book).save();
		} catch (err: any) {
			throw new AppError({
				httpCode: HttpCode.INTERNAL_SERVER_ERROR,
				description: 'Fail save book exist',
			});
		}
	}
}

export default BookService;
