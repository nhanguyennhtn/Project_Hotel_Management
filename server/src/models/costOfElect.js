const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CostOfElect = new Schema({
    costOfElectricity: { type: String },
    costOfWater: { type: String },
    create_at: { type: String },
    destroy: { type: String , default: 'tồn tại'}
}, {
    timestamps: true
})

module.exports = mongoose.model('CostOfElect', CostOfElect)