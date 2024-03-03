const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
    username: {type: mongoose.Schema.ObjectId, ref: 'Account'},
    room: {type: mongoose.Schema.ObjectId, ref: 'Motel'},
    contract: {type: mongoose.Schema.ObjectId, ref: 'Contract'},
    fullname: { type: String},
    phone: { type: Number },
    IDcard: { type: String },
    licenseDate: {type: String},
    licenseAddress: {type: String},
    pay: {type: String},
    costPackage: {type: String},
    dateStart: {type: String},
    dateEnd: {type: String},
    rentalDeposit: {type: String},
    prove: {type: String},
    desc: {type: String},
    date: {type: String},
    status: {type: Boolean}

}, {
    timestamps: true
})
module.exports = mongoose.model('User', User)