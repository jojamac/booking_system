
    var logger = console;
     
    var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
     
     
    /**
     * Reserva Schema
     */
    var BookingSchema = new Schema({

    	notes : {
    		type: String
    	},
    	creation_date: {
    		type: Date, default: Date.now, required: true
    	},
        user : {
            type: Schema.ObjectId, ref: 'Users', required: true
        },
        userInfo : {
            type: Schema.Types.Mixed, required: true
        },
        product : {
            type: Schema.ObjectId, ref: 'Products', required: true
        },
        start_date : {
            type: Date, required: true
        },
        end_date : {
            type: Date, required: true
        }
    });
     
     
    module.exports.model = function(){
        mongoose.model('Bookings', BookingSchema);
    };
     
    module.exports.schema = BookingSchema;
