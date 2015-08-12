/**
 * This module represents a repository for the collection Products
 * @module repository/UserRepository
 */

var logger = console;
var mongoose = require('mongoose');

var Q = require('q');

var Product = mongoose.model('Products');

/**
 * Returns all products with pagination
 * @param {Array} optional optional params for the query (offset, limit, id, name, etc)
 * @returns {Product}
 */
module.exports.getProducts = function (optional) {

    var limit = optional.limit;
    var offset = optional.offset;
    var orderBy = optional.orderBy;
    var orderType = optional.orderType;

    if (typeof limit === 'undefined' || limit.length == 0 || parseInt(limit) > 100) {
        limit = 10;
    }

    var searchParams = {archived:{$ne: true}};

    if (typeof  optional.name != 'undefined') {
        var regex = new RegExp(optional.name, 'i');
        searchParams.name = regex;
    }

    var count = Product.count(searchParams);

    var countPromise = count.count().exec();

    var result = {};

    return countPromise.then(function (countResult) {

        result.count = countResult;

        var find = Product.find(searchParams);

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
 * This method creates a new product
 * @param product
 * @returns {product}
 */
module.exports.createProduct = function (product) {

    var promise = Product.create(product);
    return promise;

};


/**
 * Updates a product according to the _id
 * @param {string} id the _id of the product to be updated
 * @param {Product} The user to be updated
 * @returns {Product}
 */
module.exports.updateProduct = function (id, product) {

    var promise = Product.findByIdAndUpdate(id, product).exec();

    return promise.then(function (foundProduct) {
        return Product.findOne({_id: id}).exec();
    });

};



