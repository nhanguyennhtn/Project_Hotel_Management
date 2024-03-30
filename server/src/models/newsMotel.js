const mongoose = require('mongoose')

const Schema = mongoose.Schema

const NewPage = new Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    room: { type: mongoose.Schema.ObjectId, ref: 'Motel' },
    img: { type: Object },
    desc: { type: String },
    status: { type: Boolean },
    date: { type: String }
}, {
    timestamps: true
})
module.exports = mongoose.model('NewPage', NewPage)