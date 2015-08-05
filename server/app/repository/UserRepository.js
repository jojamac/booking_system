/**
 * Created by jhoncruz on 5/08/15.
 */

var logger = console;
var mongoose = require('mongoose');

var User = mongoose.model('Users');

/**
 * This method creates a new user
 * @param user
 * @returns {user}
 */
module.exports.createUser = function(user) {
    /* PROTECTED REGION ID(DesclubAPI_mx.com.desclub_category_DocumentalRepository_CategoryRepository__Operation_createCategory_body) ENABLED START */
    var promise = User.create(user);
    return promise;
    /* PROTECTED REGION END */
};