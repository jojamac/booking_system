/**
 * Created by jhoncruz on 5/08/15.
 */

var logger = console;
var repositoryFactory = require('../repository/RepositoryFactory').getRepositoryFactory();

// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];

var userRepository = repositoryFactory.getUserRepository();

module.exports.createUser = function (req, res) {

    var user = {
        name: 'David',
        email: 'david@dfgdfg.com',
        phone: '3454535'

    };

    var promise = userRepository.createUser(user);

    promise.then(function (userCreated) {

        logger.debug(userCreated);

    }).then(null, function (error) {
        logger.trace(error);
    });
    /* PROTECTED REGION END */
};