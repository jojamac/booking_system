	var userRoute = require("./UserRoute");

	
	/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub__route_RouteIndex_init) ENABLED START */
	
	var logger = console;
	var env = process.env.NODE_ENV || 'development';
	var config = require('../../config/config')[env];
	
	/* PROTECTED REGION END */

	
	
	/**
	 * Main function to bootstrap all routes of this app
	 * @param app the express app
	 * @param passport the passport object for auth
	 */
	module.exports = function (app, passport) {
		
		/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub__route_RouteIndex_commonRoute) ENABLED START */
		/* PROTECTED REGION END */

		userRoute(app, passport);
		

		/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub__route_RouteIndex_additionalRoutes) ENABLED START */
		/* PROTECTED REGION END */
	}
