const model = require('../models/accountModel')

const accountController = {
    handleRead: (req, res, next) => {
        model.find()
            .then(allUsers => res.status(200).json({
                allUsers
            }))
            .catch(next)
    },
    handleRegister: async (req, res, next) => {
        await model.findOne({ username: req.body.username })
            .then(async (user) => {
                if (user) {
                    return res.status(400).json({ status: false, message: `User existed` })
                }

                const createUser = new model(req.body)
                await createUser.save()
                    .then(() => {
                        res.status(200).json({ status: true, message: 'User Registered Successfully' })
                    })
                    .catch(next)
            })
    },

    handleLogin: async (req, res, next) => {
        const { username, password } = req.body
        await model.findOne({ username })
            .then(async (user) => {
                if (!user) {
                    res.status(400).json({ status: false, message: `User don't exist` })
                }

                if (password !== user.password) {
                    res.status(400).json({ status: false, message: `Password invalid` })
                }

                res.status(200).json({ status: true, user })
            })
            .catch(next)
    }
}

module.exports = accountController