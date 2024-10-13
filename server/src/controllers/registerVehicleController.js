const models = require('../models/registerVehicle')

const registerVehicle = {
    create: function (req, res, next) {
        models.create(req.body)
            .then(registerVehicle => res.json({ registerVehicle }))
            .catch(next)
    },
    read: function (req, res, next) {
        models.find()
            .populate('user')
            .populate('ma_the')
            .populate('ma_TTX')
            .then(registerVehicle => res.json({ registerVehicle }))
            .catch(next)
    },
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(registerVehicle => res.json({ registerVehicle }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(registerVehicle => res.json({ registerVehicle }))
            .catch(next)
    }
}

module.exports = registerVehicle