// Function to create custom validation error messages
export const customMessages = {
	'string.base': '{{#label}} must be a string',
	'string.empty': '{{#label}} cannot be empty',
	'string.min': '{{#label}} must be at least {{#limit}} characters',
	'string.max': '{{#label}} must be less than {{#limit}} characters',
	'string.email': '{{#label}} must be a valid email',
	'number.base': '{{#label}} must be a number',
	'number.min': '{{#label}} must be greater than or equal to {{#limit}}',
	'number.max': '{{#label}} must be less than or equal to {{#limit}}',
	'any.required': '{{#label}} is required',
	'any.only': '{{#label}} must be one of {{#valids}}',
	'object.unknown': '{{#label}} is not allowed',
};
