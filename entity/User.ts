import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const userSchema = new Schema({
	_id: {
		type: String
	},
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	birthday: {
		type: Date,
		required: true,
	},
	email: {
		type: String,
		required: true,
		minLength: 8,
		unique: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
  }
});

const User = model('User', userSchema);
export default User;
