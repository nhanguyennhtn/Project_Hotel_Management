const model = require('../models/expenseMotel')

const expenseController = {
    create: function (req, res, next) {
        model.create(req.body)
            .then(expense => res.json({ expense }))
            .catch(next)
    },

    read: (req, res, next) => {
        model.find()
            .populate('contract')
            .populate('room')
            .populate('user')
            .then(expenses => res.json({ expenses }))
            .catch(next)
    },
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(expense => res.json({ expense }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(expense => res.json({ expense }))
            .catch(next)
    }
}

module.exports = expenseController