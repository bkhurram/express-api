// import { MongoClient, Db } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const schema = process.env.DB_SCHEMA || 'mongodb://';
const user = process.env.DB_USER || '';
const pass = process.env.DB_PASS || '';
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

// Database Name
const dbName = 'test';

export const connectToDatabase = async () => {
	const userConn = user && pass ? `${user}:${pass}@` : '';
	const uriConnection = `${schema}${userConn}${host}${port ? ':' + port : ''}/${dbName}`

	// const client = await MongoClient.connect('mongodb://0.0.0.0:27017?directConnection=true&serverSelectionTimeoutMS=2000&appName=express-api');
	// const client = await MongoClient.connect('mongodb://mongodb:27017?directConnection=true&serverSelectionTimeoutMS=2000&appName=express-api');
	try {
		await mongoose.connect(uriConnection, {
			retryWrites: true,
			serverSelectionTimeoutMS: 2000,
			appName: 'express-api'
		});
		console.info('Connected successfully to DB server');
	} catch (error) {
		console.error(error);
	}
}
