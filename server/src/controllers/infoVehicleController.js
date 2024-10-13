const models = require('../models/infoVehicle')

const infoVehicle = {
    create: function (req, res, next) {
        models.create(req.body)
            .then(infoVehicle => res.json({ infoVehicle }))
            .catch(next)
    },
    read: function (req, res, next) {
        models.find()
            .then(infoVehicle => res.json({ infoVehicle }))
            .catch(next)
    },
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(infoVehicle => res.json({ infoVehicle }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(infoVehicle => res.json({ infoVehicle }))
            .catch(next)
    }
}

module.exports = infoVehicle