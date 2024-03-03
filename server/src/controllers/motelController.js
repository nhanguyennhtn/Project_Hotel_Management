const model = require('../models/motelModel')

const motelController = {
    create: function (req, res, next) {
        model.create(req.body)
            .then(motel => res.json({ motel }))
            .catch(next)
    },

    read: (req, res, next) => {
        model.find()
            .then(motels => res.json({ motels }))
            .catch(next)
    },
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(motel => res.json({ motel }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(motel => res.json({ motel }))
            .catch(next)
    }
}

module.exports = motelController