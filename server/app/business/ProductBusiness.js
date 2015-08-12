/**
 * This module represents a set of business methods
 * @module business/ProductBusiness
 */

var logger = console;
var repositoryFactory = require('../repository/RepositoryFactory').getRepositoryFactory();

// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];

var productRepository = repositoryFactory.getProductRepository();

var ErrorUtil = require('./util/ErrorUtil');

var mongoose = require('mongoose');
var SchemaType = mongoose.SchemaType;
var CastError = SchemaType.CastError;

var ValidationError = mongoose.Error.ValidationError;
var ValidatorError = mongoose.Error.ValidatorError;

var extend = require('util')._extend;

/**
 * Returns all products. Results can be refined with optional parameters
 * @param {integer} offset -HTTP Type: QUERY- the index where the records start from
 * @param {integer} limit -HTTP Type: QUERY- the limit of records to retrieve
 * @param {string} orderBy -HTTP Type: QUERY- the order field
 * @param {string} orderType -HTTP Type: QUERY- the order type field
 * @param {string} id -HTTP Type: QUERY- the id of the product to be retrieved
 * @param {string} name -HTTP Type: QUERY- the name of the product to be retrieved
 * @returns {product}
 */
module.exports.getProducts = function(req, res){
    var limit = req.query.limit;
    var offset = req.query.offset;
    var orderBy = req.query.orderBy;
    var orderType = req.query.orderType;
    var id = req.query.id;
    var name = req.query.name;
    var archived = req.query.archived;

    var promise = productRepository.getProducts(req.query);

    promise.then(function (products) {
        logger.debug(products);
        res.header(config.countHeader, products.count);
    }).then(null, function (error) {
        logger.error(error.toString());
        res.status(500).json(ErrorUtil.unknownError(error));
    });

};

/**
 * Create a new product
 * @param {product} product -HTTP Type: BODY- The product to be created
 * @returns {product}
 */
module.exports.createProduct = function (req, res) {
    var product = req.body;

    var promise = productRepository.createProduct(product);

    promise.then(function (productCreated) {
        logger.debug(productCreated);
        res.json({message: 'Product created'});
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
 * Updates a product
 * @param {string} id -HTTP Type: NAMED- the _id of the product to update
 * @param {Product} user -HTTP Type: BODY- the product to update
 * @returns {Product}
 */
module.exports.updateProduct = function(req, res){
    var id = req.params.id;
    var product = req.body;

    var promise = productRepository.updateProduct(id, product);

    promise.then(function (productUpdated) {
        logger.debug(productUpdated);
        res.json({message: 'Product updated'});
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

