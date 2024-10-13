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
                    return res.status(400).json({ status: false, message: `Người dùng đã tồn tại!` })
                }

                const createUser = new model(req.body)
                await createUser.save()
                    .then(() => {
                        res.status(200).json({ status: true, message: 'Đăng ký thành công' })
                    })
                    .catch(next)
            })
    },

    handleLogin: async (req, res, next) => {
        const { username, password } = req.body
        await model.findOne({ username })
            .then(async (user) => {
                if (!user) {
                    res.status(400).json({ status: false, message: `Người dùng không tồn tại` })
                }

                if (password !== user.password) {
                    res.status(400).json({ status: false, message: `Mật khẩu không chính xác` })
                }
                res.status(200).json({ status: true, user })
            })
            .catch(next)
    }
}

module.exports = accountController