/**
 * This module represents a repository for the collection Bookings
 * @module repository/BookingRepository
 */

var logger = console;
var mongoose = require('mongoose');

var Q = require('q');

var Booking = mongoose.model('Bookings');

/**
 * Returns all bookings with pagination
 * @param {Array} optional optional params for the query (offset, limit, id, name, etc)
 * @returns {Booking}
 */
module.exports.getBookings = function (optional) {

    var limit = optional.limit;
    var offset = optional.offset;
    var orderBy = optional.orderBy;
    var orderType = optional.orderType;

    if (typeof limit === 'undefined' || limit.length == 0 || parseInt(limit) > 100) {
        limit = 10;
    }

    var searchParams = {};

    if (typeof  optional.notes != 'undefined') {
        var regex = new RegExp(optional.notes, 'i');
        searchParams.notes = regex;
    }

    var count = Booking.count(searchParams);

    var countPromise = count.count().exec();

    var result = {};

    return countPromise.then(function (countResult) {

        result.count = countResult;

        var find = Booking.find(searchParams);

        if (typeof  limit !== 'undefined') {
            find = find.limit(limit);
        }

        if (typeof  offset !== 'undefined' && parseInt(offset) > 0) {
            find = find.skip(offset);
        }

        if (typeof  orderBy !== 'undefined') {
            var sort = {};
            if (orderType == 1) {
                sort[orderBy] = 1;
                find = find.sort(sort);
            } else {
                sort[orderBy] = -1;
                find = find.sort(sort);
            }
        }

        return find.exec();

    }).then(function (resultList) {
        result.list = resultList;

        var deferred = Q.defer();

        deferred.resolve(result);

        return deferred.promise;

    });


};


/**
 * This method creates a new booking
 * @param booking
 * @returns {booking}
 */
module.exports.createBooking = function (booking) {

    var promise = Booking.create(booking);
    return promise;

};


/**
 * Updates a booking according to the _id
 * @param {string} id the _id of the booking to be updated
 * @param {Booking} The booking to be updated
 * @returns {Booking}
 */
module.exports.updateBooking = function (id, booking) {

    var promise = Booking.findByIdAndUpdate(id, booking).exec();

    return promise.then(function (foundBooking) {
        return Booking.findOne({_id: id}).exec();
    });

};


/**
 * Removes a booking according to the _id
 * @param {string} id the _id of the booking to be removed
 * @returns {undefined}
 */
module.exports.removeBooking = function (id) {
    var promise = Booking.findByIdAndRemove(id).exec();
    return promise;

};
