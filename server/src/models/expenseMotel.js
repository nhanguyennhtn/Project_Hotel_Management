const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Expense = new Schema({
    costOfElectricity: { type: Number },
    costOfWater: { type: Number },
    electric: {type: String},
    Water: {type: String},
    date:  { type: String },
}, {
    timestamps: true
})
module.exports = mongoose.model('Expense', Expense)