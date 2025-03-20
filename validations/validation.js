const joi = require('joi');

const registerValidation = (data) => {
    const schemaValidation = joi.object({
        name: joi.string().max(100).required(),
        email: joi.string().required().email(),
        password: joi.string().min(6).max(256).required()
    });
    return schemaValidation.validate(data);
}

const loginValidation = (data) => {
    const schemaValidation = joi.object({
        email: joi.string().required().email(),
        password: joi.string().min(6).max(256).required()
    });
    return schemaValidation.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;