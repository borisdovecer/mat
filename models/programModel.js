var mongoose = require('mongoose');

var schema = mongoose.Schema;

var programSchema = new schema({
    title:{
        type:String
    },
    description: {
        type: String
    },

    image: {
        type: String
    },

    createdOn: {
        type: Date
    },
    slug: {
        type: String
    }

});

module.exports = mongoose.model('program',programSchema);