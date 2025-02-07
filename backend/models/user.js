import { State } from 'country-state-city';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Name is required',
	},
	surname: {
		type: String,
		trim: true,
		required: 'surname is required',
	},
	username: {
		type: String,
		trim: true,
		required: 'username is required',
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: 'Email is required',
	},
	userType: {
		type: String,
		required: 'Select either student or tutor',
		enum: ['student', 'tutor'],
	},
	dob: {
		type: Date,
		required: 'Please provide your date of birth',
	},
	gender: {
		type: String,
		required: 'Please provide your gender',
	},
	phone: {
		type: String,
		required: 'Please provide your phone number',
	},
	country: {
		type: String,
		required: 'Please select your country',
	},
	state: {
		type: String,
		required: function () {
			if (!this.country) return false;
			const states = State.getStatesOfCountry(this.country);
			return states.length > 0;
		},
		message: 'State is required for selected country',
	},

	school: {
		type: String,
		required: function () {
			return this.userType === 'student';
		},
	},
	languages: {
		type: String,
		required: function () {
			return this.userType === 'tutor';
		},
	},
	profilecompleted: {
		type: Boolean,
		default: false,
	},
});
// In your User model
// userSchema.index({ email: 1 }, { unique: true });
export default mongoose.model('User', userSchema);
