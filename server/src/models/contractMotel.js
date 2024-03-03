const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Contract = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    room: {type: mongoose.Schema.ObjectId, ref: 'Motel'},
    host: {type: String},
    phoneHost: {type: String},
    cycle: {type: String},
    topic: {type: String },
    desc: {type: String},
    signatureA: {type: String},
    signatureB: {type: String}, 
    date: {type: String},
    contain:{type: String},
    status: {type: Boolean}
}, {
    timestamps: true
})
module.exports = mongoose.model('Contract', Contract)