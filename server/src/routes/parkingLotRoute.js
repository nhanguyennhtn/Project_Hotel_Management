const express = require('express')

const controller = require('../controllers/parkingLotController')

const router = express.Router()

const route = (app) => {
    router.post('/create', controller.create)
    router.get('/read', controller.read)
    router.put('/update/:id', controller.update)
    router.delete('/delete/:id', controller.delete)

    return app.use('/api/prakingLots', router)
}

module.exports = route