//对应user集合

const mongoose = require('../db')


//用schema定义数据规范
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, //这个username是必须得有的
        unique: true //唯一，不重复
    },
    password: String,
    email: {
        type: String,
        required: true, //这个username是必须得有的
        unique: true //唯一，不重复
    }
})

//model对应collection
const User = mongoose.model('user', UserSchema)

module.exports = User