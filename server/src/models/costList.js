const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CostList = new Schema({
    trongngay: { type: String },
    quadem: { type: String },
    goithang: { type: String },
    ngaylap_G: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('CostList', CostList)