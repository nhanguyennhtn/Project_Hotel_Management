const models = require('../models/parkingLotModel')

const parkingLot = {
    create: function (req, res, next) {
        models.create(req.body)
            .then(parkingLot => res.json({ parkingLot }))
            .catch(next)
    },
    read: function (req, res, next) {
        models.find()
            .then(parkingLot => res.json({ parkingLot }))
            .catch(next)
    },
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(parkingLot => res.json({ parkingLot }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(parkingLot => res.json({ parkingLot }))
            .catch(next)
    }
}

module.exports = parkingLot