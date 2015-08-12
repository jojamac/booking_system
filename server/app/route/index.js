var userRoute = require("./UserRoute");
var productRoute = require("./ProductRoute");
var bookingRoute = require("./BookingRoute");


var logger = console;
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];



/**
 * Main function to bootstrap all routes of this app
 * @param app the express app
 * @param passport the passport object for auth
 */
module.exports = function (app, passport) {

    userRoute(app, passport);
    productRoute(app, passport);
    bookingRoute(app, passport);
}
