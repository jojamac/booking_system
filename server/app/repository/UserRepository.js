/**
 * This module represents a repository for the collection Users
 * @module repository/UserRepository
 */

var logger = console;
var mongoose = require('mongoose');

var Q = require('q');

var User = mongoose.model('Users');

/**
 * Returns all users with pagination
 * @param {Array} optional optional params for the query (offset, limit, id, name, etc)
 * @returns {User}
 */
module.exports.getUsers = function (optional) {

    var limit = optional.limit;
    var offset = optional.offset;
    var orderBy = optional.orderBy;
    var orderType = optional.orderType;

    if (typeof limit === 'undefined' || limit.length == 0 || parseInt(limit) > 100) {
        limit = 10;
    }

    var searchParams = {};

    if (typeof  optional.name != 'undefined') {
        var regex = new RegExp(optional.name, 'i');
        searchParams.name = regex;
    }
    if (typeof  optional.email != 'undefined') {
        var regex = new RegExp(optional.email, 'i');
        searchParams.email = regex;
    }

    var count = User.count(searchParams);

    var countPromise = count.count().exec();

    var result = {};

    return countPromise.then(function (countResult) {

        result.count = countResult;

        var find = User.find(searchParams);

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
 * This method creates a new user
 * @param user
 * @returns {user}
 */
module.exports.createUser = function (user) {

    var promise = User.create(user);
    return promise;

};


/**
 * Updates a user according to the _id
 * @param {string} id the _id of the user to be updated
 * @param {User} The user to be updated
 * @returns {User}
 */
module.exports.updateUser = function (id, user) {

    var promise = User.findByIdAndUpdate(id, user).exec();

    return promise.then(function (foundUser) {
        return User.findOne({_id: id}).exec();
    });

};


/**
 * Removes a user according to the _id
 * @param {string} id the _id of the user to be removed
 * @returns {undefined}
 */
module.exports.removeUser = function (id) {
    var promise = User.findByIdAndRemove(id).exec();
    return promise;

};

