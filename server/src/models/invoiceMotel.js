const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Invoice = new Schema({
    expense: { type: mongoose.Schema.ObjectId, ref: 'Expense' },
    username: { type: mongoose.Schema.ObjectId, ref: 'Contract'},
    other: { type: Number },
    price: {type: Number},
    date: { type: String },
}, {
    timestamps: true
})
module.exports = mongoose.model('Invoice', Invoice)