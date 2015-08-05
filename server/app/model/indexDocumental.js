/**
 * Created by jhoncruz on 5/08/15.
 */
/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub_DocumentalIndexModel__init) ENABLED START */
var mongoose = require('mongoose');
var logger = console;

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];

/* PROTECTED REGION END */

//setup mongoDB connection

var connectionString = 'mongodb://'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.name+'';

if(config.mongo.user.length > 0 && config.mongo.password.length > 0){
    connectionString = 'mongodb://'+config.mongo.user+':'+config.mongo.password+'@'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.name+'';
}

mongoose.connect(connectionString, function (err, res) {
    if (err) throw err;
    logger.debug('Successful connection to MongoDB');
});

/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub_DocumentalIndexModel__mid) ENABLED START */
mongoose.set('debug', true);
/* PROTECTED REGION END */

logger.debug('Rergistrando modelos ..');

require('./Booking').model();
require('./Products').model();
require('./Users').model();

/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub_DocumentalIndexModel__end) ENABLED START */
/* PROTECTED REGION END */