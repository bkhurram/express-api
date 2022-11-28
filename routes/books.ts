import { Router } from 'express';
import { HttpCode } from '../models/HttpCode';
import BookService from '../services/BookService';
import { BookType } from '../types/Book';
import verifyToken from '../middleware/verifyToken';
import { CustomRequest } from '../types/CustomRequest';

const router = Router();

router.get('/', verifyToken, async (req:CustomRequest, res) => {

	if (req.user === undefined) {
		res.status(403).send({ message: "Unauthorised access" });
	}

	const bookService = new BookService();
	const books = await bookService.getAll();
	res.json(books);
});

router.post('/', async (req, res) => {
	const book: BookType = req.body;
	const bookService = new BookService();
	await bookService.store(book);
	res.status(HttpCode.CREATED).json();
});

export default router;


