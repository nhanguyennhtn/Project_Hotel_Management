const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RegisterVehicle = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    ma_TTX: {type: mongoose.Schema.ObjectId, ref: 'InfoVehicle'},
    ma_the: {type: mongoose.Schema.ObjectId, ref: 'CardVehicle'},
    ngaydangky: {type: String},
    ngayketthuc: {type: String},
    trangthai: {type: String},
},{
    timestamps: true
})

module.exports = mongoose.model('RegisterVehicle', RegisterVehicle)