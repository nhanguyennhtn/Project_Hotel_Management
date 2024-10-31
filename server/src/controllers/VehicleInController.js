const models = require('../models/VehicleIn')
const { update, readOne } = require('./cardVehicleController')

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
            .then(vehicleIn => res.status(200).json({ vehicleIn }))
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
        const biensoND2 = req.params.biensoND2;
        const updateData = req.body;

        models.findOne({ biensoxe_XV: biensoND2 })
            .then(vehicleIn => {
                if (!vehicleIn) {
                    return res.status(404).json({ message: 'Vehicle not found' });
                }

                // If `trangthai` is "Trong bãi" and we want to update it to "Rời bãi"
                if (vehicleIn.trangthai === 'Trong bãi' && updateData.trangthai === 'Rời bãi') {
                    vehicleIn.trangthai = 'Rời bãi';
                }

                // Update other fields only if they are provided in the request body
                vehicleIn.ma_DKX = updateData.ma_DKX || vehicleIn.ma_DKX;
                vehicleIn.ma_the = updateData.ma_the || vehicleIn.ma_the;
                vehicleIn.ma_BX = updateData.ma_BX || vehicleIn.ma_BX;
                vehicleIn.biensoxe_XV = updateData.biensoxe_XV || vehicleIn.biensoxe_XV;
                vehicleIn.anh_XV = updateData.anh_XV || vehicleIn.anh_XV;
                vehicleIn.anhBS_XV = updateData.anhBS_XV || vehicleIn.anhBS_XV;
                vehicleIn.chucvu_XV = updateData.chucvu_XV || vehicleIn.chucvu_XV;
                vehicleIn.thoigian_XV = updateData.thoigian_XV || vehicleIn.thoigian_XV;

                // Save the updated vehicle information
                return vehicleIn.save();
            })
            .then(vehicleIn => res.json({ vehicleIn }))
            .catch(next);
    },
    delete: (req, res, next) => {
        model.deleteOne({ _id: req.params.id })
            .then(vehicleIn => res.json({ vehicleIn }))
            .catch(next)
    }
}

module.exports = vehicleIn