import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const bookSchema = new Schema({
	author: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	publishedOn: {
		type: Date,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now
  }
});

const Book = model('Book', bookSchema);
export default Book;
