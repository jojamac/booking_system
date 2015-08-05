
    var logger = console;
     
    var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
     
     
    /**
     * Usuario Schema
     */
    var UsuarioSchema = new Schema({
     
    	usuarioId : {
    		type: Number, required: true
    	},
    	nombre : {
    		type: String, required: true
    	},
    	email : {
    		type: String, required: true
    	},
        telefono : {
            type: String
        }
    });
     
     
    module.exports.model = function(){
        mongoose.model('Usuarios', UsuarioSchema);
    };
     
    module.exports.schema = UsuarioSchema;
