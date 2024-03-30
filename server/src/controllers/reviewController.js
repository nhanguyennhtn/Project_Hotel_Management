const model = require('../models/reviewMotel')

const reviewController = {
    create: function (req, res, next) {
        model.create(req.body)
            .then(review => res.json({ review }))
            .catch(next)
    },

    read: (req, res, next) => {
        model.find()
            .populate('username', 'username')
            .populate('room')
            .then(reviews => res.json({ reviews }))
            .catch(next)
    },
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(review => res.json({ review }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(review => res.json({ review }))
            .catch(next)
    }
}

module.exports = reviewController