const models = require('../models/VehicleIn')

const vehicleIn = {
    create: function (req, res, next) {
        models.create(req.body)
            .then(vehicleIn => res.json({ vehicleIn }))
            .catch(next)
    },
    read: function (req, res, next) {
        models.find()
            .populate('ma_DKX')
            .populate('ma_the')
            .populate('ma_BX')
            .then(vehicleIn => res.json({ vehicleIn }))
            .catch(next)
    },
    readOne: function (req, res, next) {
        const { biensoND2 } = req.params
    
        models.findOne({ biensoxe_XV: biensoND2 })
            .populate('ma_DKX')
            .populate('ma_the')
            .populate('ma_BX')
            .exec()
            .then(vehicleIn => {
                if (!vehicleIn) {
                    return res.status(404).json({ message: 'Vehicle not found' });
                }
                res.json({ vehicleIn }); // Return vehicle in response
            })
            .catch(error => {
                console.error('Error fetching vehicle:', error);
                next(error);
            });
    }
    ,
    update: (req, res, next) => {
        model.updateOne({ _id: req.params.id }, req.body)
            .then(vehicleIn => res.json({ vehicleIn }))
            .catch(next)
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(vehicleIn => res.json({ vehicleIn }))
            .catch(next)
    }
}

module.exports = vehicleIn