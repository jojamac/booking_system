
    var logger = console;
     
    var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
     
     
    /**
     * Producto Schema
     */
    var ProductoSchema = new Schema({
     
    	ProductoId : {
    		type: Number, required: true
    	},
    	nombre : {
    		type: String, required: true
    	},
    	descripcion : {
    		type: String
    	},
        precio : {
            type: Double, required: true
        },
        cupos : {
            type: Integer, required: true
        },
        duracion_horas : {
            type: Double, required: true
        },
        archivado : {
            type: Boolean
        }
    });
     
     
    module.exports.model = function(){
        mongoose.model('Productos', ProductoSchema);
    };
     
    module.exports.schema = ProductoSchema;
