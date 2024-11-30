const { populate } = require('../models/registerVehicle')
const models = require('../models/VehicleOut')

const vehicleOut = {
    create: function (req, res, next) {
        models.create(req.body)
            .then(vehicleOut => res.status(200).json({ vehicleOut }))
            .catch(next)
    },
    read: function (req, res, next) {
        models.find()
            .populate({
                path: 'ma_XV',
                populate: {
                    path: 'ma_DKX',
                    populate:{
                        path: 'user'
                    }
                }
            })
            .populate('ma_NV')
            .then(vehicleOut => res.json({ vehicleOut }))
            .catch(next)
    },
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(vehicleOut => res.json({ vehicleOut }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(vehicleOut => res.json({ vehicleOut }))
            .catch(next)
    }
}

module.exports = vehicleOut