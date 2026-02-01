const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .trim()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must be at most 50 characters long',
            'any.required': 'Name is required',
        }),
});

const updateUserSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .trim()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must be at most 50 characters long',
            'any.required': 'Name is required',
        }),
});

module.exports = {
    createUserSchema,
    updateUserSchema,
};