const Joi = require('joi')

const validator = schema => payload => 
        schema.validate(payload, {abortEarly: false})

const signupSchema = Joi.object({
    firstname: Joi.string().min(2).max(10).required(),
    lastname: Joi.ref('firstname'),
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(15).required()
})

exports.validateSignup = validator(signupSchema)