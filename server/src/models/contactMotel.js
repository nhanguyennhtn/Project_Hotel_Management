const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Contact = new Schema({
    username: {type: mongoose.Schema.ObjectId, ref: 'Account'},
    fullname: {type:String},
    phone: {type:String},
    desc: {type: String},
    date: {type: String}
}, {
    timestamps: true
})

module.exports = mongoose.model('Contact', Contact)