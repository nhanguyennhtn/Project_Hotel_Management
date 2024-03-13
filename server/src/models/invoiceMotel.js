const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Invoice = new Schema({
    expense: { type: mongoose.Schema.ObjectId, ref: 'Expense' },
    contract: { type: mongoose.Schema.ObjectId, ref: 'Contract'},
    user: { type: mongoose.Schema.ObjectId, ref: 'User'},
    other: { type: Number },
    price: {type: Number},
    date: { type: String },
}, {
    timestamps: true
})
module.exports = mongoose.model('Invoice', Invoice)