
    var logger = console;
     
    var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
     
     
    /**
     * Reserva Schema
     */
    var ReservaSchema = new Schema({
     
    	reservaId : {
    		type: Number, required: true
    	},
    	nota : {
    		type: String
    	},
    	fecha_creacion : {
    		type: Date, default: Date.now, required: true
    	},
        idUsuario : {
            type: Schema.ObjectId, ref: 'Usuarios'
        },
        idUsuario : {
            nombre: String, email: String
        },
        idProducto : {
            type: Integer
        },
        fecha_inicio : {
            type: Date, required: true
        },
        fecha_fin : {
            type: Date, required: true
        }
    });
     
     
    module.exports.model = function(){
        mongoose.model('Reservas', ReservaSchema);
    };
     
    module.exports.schema = ReservaSchema;
