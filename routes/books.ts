import express from 'express';
import client from '../config/database';

const router = express.Router();
// const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// const url = 'mongodb://0.0.0.0:27017?directConnection=true&serverSelectionTimeoutMS=2000&appName=express-api';
// const client = new MongoClient(url);

// let books = [];

router.get('/', async (req, res) => {
	const db = client.getDb();
	const collection = db.collection('books');

	const findResult = await collection.find({}).toArray();
	console.log('Found documents =>', findResult);

	res.json(findResult);
});

router.post('/', async (req, res) => {
	const book = req.body;

	// console.log(book);
	// books.push(book);

	const db = client.getDb();
	const collection = db.collection('books');
	await collection.insertOne(book);

	res.json();
});

export default router;


