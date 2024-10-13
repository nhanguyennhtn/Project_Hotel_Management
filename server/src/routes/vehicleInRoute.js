const express = require('express')

const controller = require('../controllers/VehicleInController')

const router = express.Router()

const route = (app) => {
    router.post('/create', controller.create)
    router.get('/read', controller.read)
    router.get('/:biensoND2', controller.readOne)
    router.put('/update/:id', controller.update)
    router.delete('/delete/:id', controller.delete)

    return app.use('/api/XeVao', router)
}

module.exports = route