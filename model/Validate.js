const Joi = require('@hapi/joi')

const register = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(10).max(80),
    password: Joi.string().required().min(6).max(80),
})

const login = Joi.object({
    email: Joi.string().required().min(10).max(80),
    password: Joi.string().required().min(6).max(80),
})

module.exports = {
    register, 
    login
}