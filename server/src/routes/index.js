const motelRoute = require("./motelRoute")
const accountRoute = require("./accountRoute")
const userRoute = require("./userRoute")
const contractRoute = require("./contractRoute")
const contactRoute = require("./contactRoute")
const expenseRoute = require("./expenseRoute")

const routes = app => {
    accountRoute(app),
    motelRoute(app),
    userRoute(app),
    contactRoute(app),
    contractRoute(app),
    expenseRoute(app)
}

module.exports = routes