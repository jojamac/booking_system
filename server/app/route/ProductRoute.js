/**
 * The module representing the product routes module
 * @module route/products
 */

var productBusiness = require('../business/ProductBusiness');


/**
 * Following are the routes for product
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {


    /**
     * Routes for the context products with basePath "/products".
     * Description: Operations about products
     */

    app.post('/products', productBusiness.createProduct);

    app.get('/products', productBusiness.getProducts);


    /**
     * Routes for the context products with basePath "/products/{id}".
     * Description: Operations about products with id
     */

    app.put('/products/:id', productBusiness.updateProduct);


};