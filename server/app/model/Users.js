var logger = console;

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Usuario Schema
 */
var UsersSchema = new Schema({

    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    phone: {
        type: String
    }
});


module.exports.model = function () {
    mongoose.model('Users', UsersSchema);
};

module.exports.schema = UsersSchema;
