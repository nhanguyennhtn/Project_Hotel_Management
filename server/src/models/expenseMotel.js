const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Expense = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    contract: {type: mongoose.Schema.ObjectId, ref: 'Contract'},
    room: {type: mongoose.Schema.ObjectId, ref: 'Motel'},
    costOfElectricity: { type: String },
    costOfWater: { type: String },
    electric: {type: String},
    Water: {type: String},
    Other: {type: String},
    desc: {type: String},
    status: {type: Boolean},
    date:  { type: String },
}, {
    timestamps: true
})
module.exports = mongoose.model('Expense', Expense)