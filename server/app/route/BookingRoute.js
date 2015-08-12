/**
 * The module representing the booking routes module
 * @module route/bookings
 */

var bookingBusiness = require('../business/BookingBusiness');


/**
 * Following are the routes for booking
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {


    /**
     * Routes for the context booking with basePath "/bookings".
     * Description: Operations about bookings
     */

    app.post('/bookings', bookingBusiness.createBooking);

    app.get('/bookings', bookingBusiness.getBookings);


    /**
     * Routes for the context bookings with basePath "/bookings/{id}".
     * Description: Operations about bookings with id
     */

    app.put('/bookings/:id', bookingBusiness.updateBooking);

    app.delete('/bookings/:id', bookingBusiness.removeBooking);

};
