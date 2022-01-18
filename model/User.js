const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50},
    email: {type: String, required: true, minlength: 10, maxlength: 80},
    password: {type: String, required: true, minlength: 6, maxlength: 80},
    createdAt: {type: Date, default: Date.now()},
    admin: {type: Boolean, default: false}
})

module.exports = mongoose.model('User', userSchema)