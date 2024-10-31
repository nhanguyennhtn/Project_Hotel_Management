const models = require('../models/cardVehicle')
const moment = require('moment')

const cardVehicleController = {
    create: function (req, res, next) {
        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        const cardVehicleData = {
            ...req.body,
            trangthai_the: req.body.trangthai_the || 'Hoạt động',
            ngaylap_the: currentDateTime,
        }
        models.create(cardVehicleData)
            .then(cardVehicle => res.json({ cardVehicle }))
            .catch(next)
    },
    read: function (req, res, next) {
        models.find()
            .then(cardVehicle => res.json({ cardVehicle }))
            .catch(next)
    },
    readOne: async (req, res, next) => {
        const { _id } = req.params
        try {
            const card = await model.findById(_id) // Sử dụng findById để tìm thẻ theo ID
            if (!card) {
                return res.status(404).json({ status: false, message: 'Thẻ không tồn tại' })
            }
            res.status(200).json({ status: true, card })
        } catch (error) {
            next(error)

        }
    },
    update: (req, res, next) => {
        const ma_the = req.params.ma_the
        const updateData = req.body;  
        console.log(ma_the);
        
        models.findOne({ _id: ma_the }).lean()
            .then(cardVehicle => {
                console.log(cardVehicle);
                if (!cardVehicle) {
                    return res.status(404).json({ message: 'Card Vehicle not found' });
                }
    
                // Update only the fields that are provided in the request body
                cardVehicle.ten_the = updateData.ten_the || cardVehicle.ten_the;
                cardVehicle.ma_the = updateData.ma_the || cardVehicle.ma_the;
                cardVehicle.anhQR_the = updateData.anhQR_the || cardVehicle.anhQR_the;
                cardVehicle.noidung_the = updateData.noidung_the || cardVehicle.noidung_the;
                cardVehicle.trangthai_the = updateData.trangthai_the || cardVehicle.trangthai_the;
                cardVehicle.ngaylap_the = updateData.ngaylap_the || cardVehicle.ngaylap_the;
    
                // Now update the document in the database
                return models.updateOne({ _id: ma_the }, cardVehicle);
            })
            .then(() => {
                // Return the updated data as a plain object in the response
                res.status(200).json({ message: 'Card Vehicle updated successfully' });
            })
            .catch(next);  // Handle any errors
    },
    delete: (req, res, next) => {
        models.deleteOne({ _id: req.params.id })
            .then(cardVehicle => res.json({ cardVehicle }))
            .catch(next)
    }
}

module.exports = cardVehicleController