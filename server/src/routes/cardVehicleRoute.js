const express = require('express')

const controller = require('../controllers/cardVehicleController')

const router = express.Router()

const route = (app) => {
    router.post('/create', controller.create)
    router.get('/read', controller.read)
    router.get('/read/:id', controller.readOne)
    router.put('/update/:ma_the', controller.update)
    router.delete('/delete/:id', controller.delete)

    return app.use('/api/cardVehicles', router)
}

module.exports = route