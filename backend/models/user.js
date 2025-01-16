import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Name is required',
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: 'Email is required',
	},
	password: {
		type: String,
		// required: 'Password is required',
	},
});
export default mongoose.model('User', userSchema);
