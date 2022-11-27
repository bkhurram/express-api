const mongodb = require('mongodb');
require('dotenv').config();

const schema = process.env.DB_SCHEMA || 'mongodb://';
const user = process.env.DB_USER || '';
const pass = process.env.DB_PASS || '';
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
	const userConn = user && pass ? `${user}:${pass}@` : '';
	const uriConnection = `${schema}${userConn}${host}${port ? ':' + port : ''}/?retryWrites=true&w=majority&serverSelectionTimeoutMS=2000&appName=express-api`
	console.log(uriConnection);
	const client = await MongoClient.connect(uriConnection);
	// const client = await MongoClient.connect('mongodb://0.0.0.0:27017?directConnection=true&serverSelectionTimeoutMS=2000&appName=express-api');
	// const client = await MongoClient.connect('mongodb://mongodb:27017?directConnection=true&serverSelectionTimeoutMS=2000&appName=express-api');
	database = client.db('test');
}

function getDb() {
	if (!database) {
		throw { message: 'Database not connected!' };
	}
	return database;
}

module.exports = {
	connectToDatabase: connectToDatabase,
	getDb: getDb,
};
