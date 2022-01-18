const Validate = require('../model/Validate')

module.exports = {
    register: (data)=>{
        return Validate.register.validate(data)
    },

    login: (data)=>{
        return Validate.login.validate(data)
    }
}

