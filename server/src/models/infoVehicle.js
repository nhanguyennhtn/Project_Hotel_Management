const mongoose = require('mongoose')

const Schema = mongoose.Schema

const InfoVehicle = new Schema({
    biensoxe_TTX: {type: String},
    anhxe_TTX: {type: String},
    tenxe_TTX: {type: String},
    ngaytao_TTX: {type: String},
    trangthai: {type: String}
},{
    timestamps: true
})

module.exports = mongoose.model('InfoVehicle', InfoVehicle)