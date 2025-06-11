import Joi from 'joi';
import { ROLES } from '../../config/roles.js';
import { customMessages } from '../custom-error-messages.js';

// Base profile schema with common fields
const baseProfileSchema = {
	bio: Joi.string().max(200).allow('', null),
	address: Joi.object({
		street: Joi.string().max(100),
		city: Joi.string().max(50),
		state: Joi.string().max(50),
		zip: Joi.string().max(20),
		country: Joi.string().max(50),
	}).optional(),
};

// Student-specific profile fields
const studentProfileSchema = Joi.object({
	...baseProfileSchema,
	subjects: Joi.array().items(Joi.string().required()).min(1).optional(),
}).messages(customMessages);

// Tutor-specific profile fields
const tutorProfileSchema = Joi.object({
	...baseProfileSchema,
	subjects: Joi.array().items(Joi.string().required()).min(1).required(),
	hourlyRate: Joi.number().positive().required(),
	experience: Joi.number().min(0).required(),
}).messages(customMessages);

/**
 * Admin-specific profile fields.
 * It extends the base profile schema with additional fields specific to admin users.
 * @constant {Joi.ObjectSchema}
 * @type {Joi.ObjectSchema}
 * @description This schema includes permissions that an admin can have, it is used to validate the profile of an admin user.
 */
const adminProfileSchema = Joi.object({
	...baseProfileSchema,
	permissions: Joi.array()
		.items(
			Joi.string().valid(
				'super_admin',
				'manage_users',
				'view_reports',
				'edit_content'
			)
		)
		.min(1)
		.optional(),
}).messages(customMessages);

/**
 * Returns the profile schema based on the user's role.
 * This function dynamically selects the appropriate Joi schema for validating user profiles
 * based on the provided role.
 *
 * @function getProfileSchema
 * @description This function returns a Joi schema for validating user profiles based on their role.
 * @param {} role
 * @returns
 */
export const getProfileSchema = (role) => {
	switch (role) {
		case ROLES.STUDENT:
			return studentProfileSchema;
		case ROLES.TUTOR:
			return tutorProfileSchema;
		case ROLES.ADMIN:
			return adminProfileSchema;
		default:
			return Joi.object({
				...baseProfileSchema,
			}).messages(customMessages);
	}
};

export const updateProfileSchema = (role) => getProfileSchema(role);
