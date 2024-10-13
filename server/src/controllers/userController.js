const model = require('../models/userMotel')

const motelController = {
    create: async function (req, res, next) {
        console.log(req.body);
        await model.create(req.body)
            .then(motel => res.json({ motel }))
            .catch(next)
    },

    read: (req, res, next) => {
        model.find()
            .populate('username')
            .populate('room')
            .populate('contract')
            .then(user => res.json({ user }))
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