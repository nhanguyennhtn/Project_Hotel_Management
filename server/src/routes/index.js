const motelRoute = require("./motelRoute");
const accountRoute = require("./accountRoute");
const userRoute = require("./userRoute");
const contractRoute = require("./contractRoute");
const contactRoute = require("./contactRoute");
const expenseRoute = require("./expenseRoute");
const newPageRoute = require("./newsRoute");
const reviewRoute = require("./reviewRoute");
const costofElect = require("./costofElectRoute");
const cardVehicle = require("./cardVehicleRoute");
const costList = require("./costListRoute");
const infoVehicle = require("./infoVehicleRoute");
const registerVehicle = require("./registerVehicleRoute");
const vehicleIn = require("./vehicleInRoute");
const vehicleOut = require("./vehicleOutRoute");
const serviceCamera = require('./serviceCameraRoute');

const routes = (app) => {
    accountRoute(app);
    motelRoute(app);
    userRoute(app);
    contactRoute(app);
    contractRoute(app);
    expenseRoute(app);
    reviewRoute(app);
    newPageRoute(app);
    costofElect(app);
    cardVehicle(app);
    costList(app);
    infoVehicle(app);
    registerVehicle(app);
    vehicleIn(app);
    vehicleOut(app);
    serviceCamera(app);
}

module.exports = routes;
