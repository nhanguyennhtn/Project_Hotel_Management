const model = require('../models/newsMotel')

const newPageController = {
    create: function (req, res, next) {
        model.create(req.body)
            .then(newPage => res.json({ newPage }))
            .catch(next)
    },

    read: (req, res, next) => {
        model.find()
            .populate('user')
            .populate('room')
            .then(newPages => res.json({ newPages }))
            .catch(next)
    },
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(newPage => res.json({ newPage }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(newPage => res.json({ newPage }))
            .catch(next)
    }
}

module.exports = newPageController