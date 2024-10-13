const models = require('../models/costList')

const costList = {
    create: function (req, res, next) {
        models.create(req.body)
            .then(costList => res.json({ costList }))
            .catch(next)
    },
    read: function (req, res, next) {
        models.find()
            .then(costList => res.json({ costList }))
            .catch(next)
    },
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(costList => res.json({ costList }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(costList => res.json({ costList }))
            .catch(next)
    }
}

module.exports = costList