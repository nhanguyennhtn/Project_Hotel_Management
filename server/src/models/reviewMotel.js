const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Review = new Schema({
    username: { type: mongoose.Schema.ObjectId, ref: 'Account' },
    room: { type: mongoose.Schema.ObjectId, ref: 'Motel' },
    desc: { type: String },
    reply: {
        title: String,
        desc: String,
        date: String
    },
    star: { type: Number },
    date: { type: String }
}, {
    timestamps: true
})
module.exports = mongoose.model('Review', Review)