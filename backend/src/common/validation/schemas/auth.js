import Joi from 'joi';
import { customMessages } from '../custom-error-messages.js';

const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const loginSchema = Joi.object({
	email: Joi.string().email().required().messages(customMessages),
	password: Joi.string().required().messages(customMessages),
}).messages(customMessages);

export const resetPasswordSchema = Joi.object({
	email: Joi.string().email().required().messages(customMessages),
}).messages(customMessages);

export const confirmResetPasswordSchema = Joi.object({
	token: Joi.string().required().messages(customMessages),
	password: Joi.string()
		.pattern(passwordRegex)
		.required()
		.messages({
			...customMessages,
			'string.pattern.base':
				'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
		}),
	confirmPassword: Joi.string()
		.valid(Joi.ref('password'))
		.required()
		.messages({
			...customMessages,
			'any.only': 'Passwords must match',
		}),
}).messages(customMessages);

export const changePasswordSchema = Joi.object({
	currentPassword: Joi.string().required().messages(customMessages),
	newPassword: Joi.string()
		.pattern(passwordRegex)
		.required()
		.messages({
			...customMessages,
			'string.pattern.base':
				'New password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
		}),
	confirmPassword: Joi.string()
		.valid(Joi.ref('newPassword'))
		.required()
		.messages({
			...customMessages,
			'any.only': 'New passwords must match',
		}),
}).messages(customMessages);
