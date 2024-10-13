const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VehicleOut = new Schema({
    ma_XV: { type: mongoose.Schema.ObjectId, ref: 'VehicleIn' },
    ma_NV: { type: mongoose.Schema.ObjectId, ref: 'User' },
    biensoxe_XR: { type: String },
    anh_XR: { type: String },
    anhBS_XR: { type: String },
    chucvu: { type: String },
    giatien: { type: String },
    thoigian_XR: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('VehicleOut', VehicleOut)