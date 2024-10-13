const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CardVehicle = new Schema({
    ten_the: {type: String},
    ma_the: {type: String},
    anhQR_the: {type: String},
    noidung_the: {type: String},
    trangthai_the: {type: String},
    ngaylap_the: {type: String}
},{
    timestamps: true
})

module.exports = mongoose.model('CardVehicle',CardVehicle)