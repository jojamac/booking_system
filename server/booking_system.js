/**
 * Created by jhoncruz on 5/08/15.
 */
/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub_serverinit) ENABLED START */
var express = require('express');

require('./config/econsole').enhance({level: 'ALL', includeDate: true});

//logging config
var logger = console;

// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

var app = express();

/* PROTECTED REGION END */


//boostrap mongoDB schemas and models
require('./app/model/indexDocumental');

//initialize repositories if required
require('./app/repository/RepositoryFactory').init(app);


// express settings
require('./config/express')(app, config);

// Bootstrap routes
require('./app/route')(app);

/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub_serverconfig) ENABLED START */

//start app on mentioned port
app.listen(config.app.port);

logger.info('listening on port ' + config.app.port);


/* PROTECTED REGION END */