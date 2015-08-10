/**
 * The module representing the user routes module
 * @module route/user
 */

var userBusiness = require('../business/UserBusiness');


/**
 * Following are the routes for user
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {


    /**
     * Routes for the context users with basePath "/users".
     * Description: Operations about users
     */

    app.post('/users', userBusiness.createUser);

    app.get('/users', userBusiness.getUsers);


    /**
     * Routes for the context users with basePath "/users/{id}".
     * Description: Operations about users with id
     */

    app.put('/users/:id', userBusiness.updateUser);

    app.delete('/users/:id', userBusiness.removeUser);

};