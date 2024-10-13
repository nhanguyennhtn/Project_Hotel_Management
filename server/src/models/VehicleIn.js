const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VehicleIn = new Schema({
    ma_DKX: { type: mongoose.Schema.ObjectId, ref: 'RegisterVehicle' },
    ma_the: { type: mongoose.Schema.ObjectId, ref: 'CardVehicle' },
    ma_BX: { type: mongoose.Schema.ObjectId, ref: 'ParkingLot' },
    biensoxe_XV: { type: String },
    anh_XV: { type: String },
    anhBS_XV: { type: String },
    chucvu_XV: { type: String },
    trangthai: { type: String },
    thoigian_XV: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('VehicleIn', VehicleIn)