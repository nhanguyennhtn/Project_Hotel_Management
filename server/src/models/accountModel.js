const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Account = new Schema({
    name: {type: String },
    username: { type: String, unique: true },
    password: { type: String, minlength: 6 },
    role: { type: Number }

}, {
    timestamps: true
})
module.exports = mongoose.model('Account', Account)