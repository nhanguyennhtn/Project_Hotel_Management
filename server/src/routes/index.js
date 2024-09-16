const motelRoute = require("./motelRoute")
const accountRoute = require("./accountRoute")
const userRoute = require("./userRoute")
const contractRoute = require("./contractRoute")
const contactRoute = require("./contactRoute")
const expenseRoute = require("./expenseRoute")
const newPageRoute = require("./newsRoute")
const reviewRoute = require("./reviewRoute")
const costofElect = require("./costofElectRoute")

const routes = app => {
    accountRoute(app),
    motelRoute(app),
    userRoute(app),
    contactRoute(app),
    contractRoute(app),
    expenseRoute(app),
    reviewRoute(app),
    newPageRoute(app),
    costofElect(app)
}

module.exports = routes