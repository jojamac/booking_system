
    var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
     
     
    /**
     * Producto Schema
     */
    var ProductSchema = new Schema({

    	name : {
    		type: String, required: true
    	},
    	description : {
    		type: String
    	},
        price : {
            type: Number, required: true
        },
        quota : {
            type: Number, required: true
        },
        duration : {
            type: Number, required: true
        },
        archived : {
            type: Boolean
        }
    });
     
     
    module.exports.model = function(){
        mongoose.model('Products', ProductSchema);
    };
     
    module.exports.schema = ProductSchema;
