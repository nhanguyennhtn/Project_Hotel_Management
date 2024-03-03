const express = require('express')

const accountController = require('../controllers/accountController')

const router = express.Router()

const account = app => {
    router.post('/register', accountController.handleRegister)
    router.post('/login', accountController.handleLogin)
    router.get('/read', accountController.handleRead)

    return app.use('/api/accounts', router)
}

module.exports = account