const model = require('../models/contractMotel')

const contractController = {
    create: function (req, res, next) {
        model.create(req.body)
            .then(contract => res.json({ contract }))
            .catch(next)
    },

    read: (req, res, next) => {
        model.find()
            .populate('user')
            .populate('room')
            .then(contracts => res.json({ contracts }))
            .catch(next)
    },
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(contract => res.json({ contract }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(contract => res.json({ contract }))
            .catch(next)
    }
}

module.exports = contractController