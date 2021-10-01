//user collection

const mongoose = require('../db')


//use schema define data specification
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, //must have username
        unique: true //unique, not duplicate
    },
    password: String,
    email: {
        type: String,
        required: true, //must have email
        unique: true //unique, not duplicate
    }
})

const User = mongoose.model('user', UserSchema)

module.exports = User