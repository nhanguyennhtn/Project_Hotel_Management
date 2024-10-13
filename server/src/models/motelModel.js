const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Motel = new Schema({
    title: { type: String, unique: true },
    price: { type: String },
    area: { type: String },
    size: { type: String },
    image: { type: String },
    desc: { type: String },
    kind: { type: String },
    status: { type: Boolean }
}, {
    timestamps: true
})
module.exports = mongoose.model('Motel', Motel)