const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ParkingLot = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    ten_BX: {type: String},
    vitri_BX: {type: String},

}, {
    timestamps: true
})
module.exports = mongoose.model('ParkingLot', ParkingLot)