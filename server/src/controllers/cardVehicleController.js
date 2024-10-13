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
        const {ma_the} = req.params
        models.updateOne({ _id: ma_the }, req.body)
            .then(cardVehicle => res.json({ cardVehicle }))
            .catch(next)
    },
    delete: (req, res, next) => {
        models.deleteOne({ _id: req.params.id })
            .then(cardVehicle => res.json({ cardVehicle }))
            .catch(next)
    }
}

module.exports = cardVehicleController