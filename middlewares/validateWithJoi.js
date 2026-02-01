const Joi = require('joi');
const { fail } = require('../utils/response');

const validateWithJoi = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            const message = errorMessages.join(', ');

            return res.status(400).json({
                success: false,
                message: message,
                errors: null,
            }); 
        }
        req.body = value;
        next();
    };
};

module.exports = validateWithJoi;