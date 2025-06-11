import Joi from 'joi';
import { ROLES } from '../../config/roles.js';
import { customMessages } from '../custom-error-messages.js';

const allowedRoles = Object.values(ROLES);

export const createUserSchema = Joi.object({
	name: Joi.string().min(2).max(50).required().messages(customMessages),
	surname: Joi.string().min(2).max(50).required().messages(customMessages),
	email: Joi.string().email().required().messages(customMessages),
	password: Joi.string()
		.min(8)
		.pattern(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		)
		.required()
		.messages({
			...customMessages,
			'string.pattern.base':
				'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
		}),
	role: Joi.string()
		.valid(...allowedRoles)
		.required()
		.messages(customMessages),
}).messages(customMessages);
