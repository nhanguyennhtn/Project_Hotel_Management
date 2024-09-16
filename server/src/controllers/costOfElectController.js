const costOfElect = require('../models/costofElect')

const costOfElectController = {
    create: function (req, res, next) {
        costOfElect.create(req.body)
            .then(expense => res.json({ expense }))
            .catch(next)
    },
    read: function (req, res, next) {
        costOfElect.find()
            .then(costOfElect => res.json({ costOfElect }))
            .catch(next)
    },
    update: function (req, res, next) {
        costOfElect.updateOne({ _id: req.params.id }, req.body)
            .then(costOfElect => res.json({ costOfElect }))
            .catch(next)
    },
    delete: function (req, res, next) {
        costOfElect.deleteOne({ _id: req.params.id })
            .then(costOfElect => res.json({ costOfElect }))
            .catch(next)
    }
}

module.exports = costOfElectController