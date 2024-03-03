const express = require('express')

const controller = require('../controllers/motelController')

const router = express.Router()

const route = app => {
    router.post('/create', controller.create)
    router.get('/read', controller.read)
    // router.get('/readUsername/:username', controller.readUsername)
    router.put('/update/:id', controller.update)
    router.delete('/delete/:id', controller.delete)

    return app.use('/api/motels', router)
}

module.exports = route