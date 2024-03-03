const model = require('../models/contactMotel')

const contactController = {
    create: function (req, res, next) {
        model.create(req.body)
            .then(contact => res.json({ contact }))
            .catch(next)
    },

    read: (req, res, next) => {
        model.find()
            .then(contacts => res.json({ contacts }))
            .catch(next)
    },
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(contact => res.json({ contact }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(contact => res.json({ contact }))
            .catch(next)
    }
}

module.exports = contactController