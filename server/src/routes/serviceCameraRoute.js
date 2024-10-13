const express = require('express')

const controller = require('../controllers/serviceCamera')

const router = express.Router()

const route = (app) => {
    router.get('/search_by_plate', controller.search_by_plate)
    router.post('/admin/addStaff', controller.AddStaff)
    router.put('/admin/updateStaff/:id', controller.updateStaff)
    router.get('/tinhtien_xera', controller.Tinhtien)

    return app.use('/api', router)
}

module.exports = route