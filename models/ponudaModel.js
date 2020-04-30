var mongoose = require('mongoose');

var schema = mongoose.Schema;

var ponudaSchema = new schema({
    title:{
        type:String
    },
    description: {
        type: String
    },
    trening: {
        type: String
    },

    program: {
        type: String
    },

    termin: {
        type: String
    },
    slug: {
        type: String
    }

});

module.exports = mongoose.model('ponuda',ponudaSchema);