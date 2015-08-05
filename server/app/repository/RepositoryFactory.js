
	/**
	 * A factory module for repositories
	 * @module repository/RepositoryFactory
	 */

	/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub__repository_RepositoryFactory_init) ENABLED START */
	var logger = console;
	var appReference = null;
	
	/* PROTECTED REGION END */
	
	/**
	 * Initializes the repository factory passing the express app as dependency
	 * @param {Express} app - The express app
	 */
	module.exports.init = function(app) {
	    appReference = app;
	};
	
	/**
	 * Returns the repository factory object with the appropiate methods
	 * for each repository
	 * @returns {object} a repositoryFactory object
	 */
	module.exports.getRepositoryFactory = function() {
		var repositoryFactory = {
			/**
			 * Creates a new BrandRepository module. It corresponds to
			 * the document Brand
			 * @returns {BrandRepository} a BrandRepository module
			 */
			getUserRepository: function(){
				return require("./UserRepository");
			}
		};
		
		/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub__repository_RepositoryFactory_additionalRepos) ENABLED START */
		/* PROTECTED REGION END */
		
		return repositoryFactory;
	};
	
	/* PROTECTED REGION ID(DesclubAPI_mx.com.desclub__repository_RepositoryFactory_additional) ENABLED START */
	/* PROTECTED REGION END */
