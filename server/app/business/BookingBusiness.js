/**
 * This module represents a set of business methods
 * @module business/BookingBusiness
 */

var logger = console;
var repositoryFactory = require('../repository/RepositoryFactory').getRepositoryFactory();

// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];

var bookingRepository = repositoryFactory.getBookingRepository();

var ErrorUtil = require('./util/ErrorUtil');

var mongoose = require('mongoose');
var SchemaType = mongoose.SchemaType;
var CastError = SchemaType.CastError;

var ValidationError = mongoose.Error.ValidationError;
var ValidatorError = mongoose.Error.ValidatorError;

var extend = require('util')._extend;

/**
 * Returns all bookings. Results can be refined with optional parameters
 * @param {integer} offset -HTTP Type: QUERY- the index where the records start from
 * @param {integer} limit -HTTP Type: QUERY- the limit of records to retrieve
 * @param {string} orderBy -HTTP Type: QUERY- the order field
 * @param {string} orderType -HTTP Type: QUERY- the order type field
 * @param {string} id -HTTP Type: QUERY- the id of the booking to be retrieved
 * @param {string} notes -HTTP Type: QUERY- the notes of the booking to be retrieved
 * @returns {user}
 */
module.exports.getBookings = function(req, res){
    var limit = req.query.limit;
    var offset = req.query.offset;
    var orderBy = req.query.orderBy;
    var orderType = req.query.orderType;
    var id = req.query.id;
    var notes = req.query.notes;

    var promise = bookingRepository.getBookings(req.query);

    promise.then(function (bookings) {
        logger.debug(bookings);
        res.header(config.countHeader, bookings.count);
    }).then(null, function (error) {
        logger.error(error.toString());
        res.status(500).json(ErrorUtil.unknownError(error));
    });

};

/**
 * Create a new booking
 * @param {booking} user -HTTP Type: BODY- The booking to be created
 * @returns {booking}
 */
module.exports.createBooking = function (req, res) {
    var booking = req.body;

    var promise = bookingRepository.createBooking(booking);

    promise.then(function (bookingCreated) {
        logger.debug(bookingCreated);
        res.json({message: 'Booking created'});
    }).then(null, function (error) {
        logger.trace(error);
        if (error.code === 11000 || error.code === 11001) {
            return res.status(409).json(ErrorUtil.duplicateError(error.err, error));
        }

        if (error instanceof  CastError) {
            return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter category', error));
        }

        if (error instanceof  ValidationError || error instanceof ValidatorError) {
            return res.status(400).json(ErrorUtil.validationError('Validation failed', error));
        }

        res.status(500).json(ErrorUtil.unknownError(error));
    });

};


/**
 * Updates a booking
 * @param {string} id -HTTP Type: NAMED- the _id of the booking to update
 * @param {Booking} user -HTTP Type: BODY- the booking to update
 * @returns {Booking}
 */
module.exports.updateBooking = function(req, res){
    var id = req.params.id;
    var booking = req.body;

    var promise = bookingRepository.updateBooking(id, booking);

    promise.then(function (bookingUpdated) {
        logger.debug(bookingUpdated);
        res.json({message: 'Booking updated'});
    }).then(null, function (error) {
        logger.trace(error);
        if (error.code === 11000 || error.code === 11001) {
            return res.status(409).json(ErrorUtil.duplicateError(error.err, error));
        }
        if (error instanceof  CastError) {
            return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter corporate', error));
        }

        if (error instanceof  ValidationError || error instanceof ValidatorError) {
            return res.status(400).json(ErrorUtil.validationError('Validation failed', error));
        }

        res.status(500).json(ErrorUtil.unknownError(error));

    });

};


/**
 * Removes a booking according to the  id
 * @param {string} id -HTTP Type: NAMED- the _id of the booking to be removed
 * @returns {undefined}
 */
module.exports.removeBooking = function(req, res){
    var id = req.params.id;

    var bookingRepository = repositoryFactory.getBookingRepository();

    var promise = bookingRepository.removeBooking(id);

    promise.then(function (booking) {
        if (typeof booking !== 'undefined' && typeof booking._id !== 'undefined') {
            res.status(204).json('');
        } else {
            res.status(404).json(ErrorUtil.notFoundError('Booking with id: ' + id + ' not found'));
        }

    }).then(null, function (error) {
        logger.error(error);
        if (typeof error !== 'undefined' && typeof error.name !== 'undefined' && error.name === 'CastError') {
            res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter _id', error));
        } else {
            res.status(500).json(ErrorUtil.unknownError(error));
        }
    });

};
