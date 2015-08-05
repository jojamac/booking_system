/**
 * Created by jhoncruz on 5/08/15.
 */

/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub_config_config_init) ENABLED START */

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

/* PROTECTED REGION END */

module.exports = {
    development: {
        loggerLevel: "debug",
        root: rootPath,
        tokenHeader: "Secure-Token",
        mongo: {
            host: "localhost",
            port: "27017",
            name: "BookingSystem",
            user: "",
            password: ""
        },

        app: {
            name: 'BookingSystem',
            host: 'localhost',
            port: 6543,
            inversePort: 6543,
            tokenExpiration: 3600000 * 2
        }
    },
    test: {
        loggerLevel: "debug",
        root: rootPath,
        tokenHeader: "Secure-Token",
        db: {
            dialect: "sqlite"
        },
        mongo: {
            host: "localhost",
            port: "27017",
            name: "BookingSystem",
            user: "",
            password: ""
        },
        app: {
            name: 'BookingSystem',
            host: 'localhost',
            port: 6543,
            inversePort: 6543,
            tokenExpiration: 3600000 * 2
        }
    },
    qa: {
        loggerLevel: "info",
        root: rootPath,
        tokenHeader: "Secure-Token",
        mongo: {
            host: "localhost",
            port: "27017",
            name: "BookingSystem",
            user: "desclubapi",
            password: "beepquest2015"
        },

        app: {
            name: 'BookingSystem',
            host: 'desclubapi.beepquest.net',
            port: 6543,
            inversePort: 80,
            tokenExpiration: 3600000 * 2
        }
    },
    production: {
        loggerLevel: "info",
        root: rootPath,
        tokenHeader: "Secure-Token",
        mongo: {
            host: "localhost",
            port: "27017",
            name: "BookingSystem",
            user: "",
            password: ""
        },
        app: {
            name: 'BookingSystem',
            host: 'localhost',
            port: 6543,
            inversePort: 80,
            tokenExpiration: 3600000 * 2
        }
    }
};