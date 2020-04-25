var mongoose = require('mongoose');

var schema = mongoose.Schema;

var videoSchema = new schema({
    title:{
        type:String
    },
    description: {
        type: String
    },
    video: {
        type: String
    },
    url: {
        type: String
    },
    image: {
        type: String
    },
    premium: {
        type: Boolean
    },
    createdOn: {
        type: Date
    }

});

module.exports = mongoose.model('video',videoSchema);