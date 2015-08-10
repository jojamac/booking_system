/**
 * This module represents a set of business methods
 * @module business/UserBusiness
 */

var logger = console;
var repositoryFactory = require('../repository/RepositoryFactory').getRepositoryFactory();

// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];

var userRepository = repositoryFactory.getUserRepository();

var ErrorUtil = require('./util/ErrorUtil');

var mongoose = require('mongoose');
var SchemaType = mongoose.SchemaType;
var CastError = SchemaType.CastError;

var ValidationError = mongoose.Error.ValidationError;
var ValidatorError = mongoose.Error.ValidatorError;

var extend = require('util')._extend;

/**
 * Returns all users. Results can be refined with optional parameters
 * @param {integer} offset -HTTP Type: QUERY- the index where the records start from
 * @param {integer} limit -HTTP Type: QUERY- the limit of records to retrieve
 * @param {string} orderBy -HTTP Type: QUERY- the order field
 * @param {string} orderType -HTTP Type: QUERY- the order type field
 * @param {string} id -HTTP Type: QUERY- the id of the user to be retrieved
 * @param {string} name -HTTP Type: QUERY- the name of the user to be retrieved
 * @returns {user}
 */
module.exports.getUsers = function(req, res){
    var limit = req.query.limit;
    var offset = req.query.offset;
    var orderBy = req.query.orderBy;
    var orderType = req.query.orderType;
    var id = req.query.id;
    var name = req.query.name;

    var promise = userRepository.getUsers(req.query);

    promise.then(function (users) {
        logger.debug(users);
        res.header(config.countHeader, users.count);
    }).then(null, function (error) {
        logger.error(error.toString());
        res.status(500).json(ErrorUtil.unknownError(error));
    });

};

/**
 * Create a new user
 * @param {user} user -HTTP Type: BODY- The user to be created
 * @returns {user}
 */
module.exports.createUser = function (req, res) {
    var user = req.body;

    var promise = userRepository.createUser(user);

    promise.then(function (userCreated) {
        logger.debug(userCreated);
        res.json({message: 'User created'});
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
 * Updates a user
 * @param {string} id -HTTP Type: NAMED- the _id of the corporate to update
 * @param {User} user -HTTP Type: BODY- the corporate to update
 * @returns {User}
 */
module.exports.updateUser = function(req, res){
    var id = req.params.id;
    var user = req.body;

    var promise = userRepository.updateUser(id, user);

    promise.then(function (userUpdated) {
        logger.debug(userUpdated);
        res.json({message: 'User updated'});
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
 * Removes a user according to the  id
 * @param {string} id -HTTP Type: NAMED- the _id of the user to be removed
 * @returns {undefined}
 */
module.exports.removeUser = function(req, res){
    var id = req.params.id;

    var userRepository = repositoryFactory.getUserRepository();

    var promise = userRepository.removeUser(id);

    promise.then(function (user) {
        if (typeof user !== 'undefined' && typeof user._id !== 'undefined') {
            res.status(204).json('');
        } else {
            res.status(404).json(ErrorUtil.notFoundError('User with id: ' + id + ' not found'));
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