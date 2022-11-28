import express from 'express';
import 'express-async-errors';
import './process';

//import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import booksRouter from './routes/books';

import { clientErrorHandler } from './middleware/clientErrorHandler';
import { logErrors } from './middleware/logErrors';

const app = express();

app.use(compression()); // Compress all routes
app.use(logger('dev'));
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.use(logErrors);
app.use(clientErrorHandler);

export default app;
