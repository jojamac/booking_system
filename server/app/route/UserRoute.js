var userBusiness = require('../business/UserBusiness');

module.exports = function (app, passport) {


    app.get('/users', userBusiness.createUser);

};