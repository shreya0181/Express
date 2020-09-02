const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {

    },
    image: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    abbr: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    featured: {
        type: Boolean,
        required : true
    }
});

var Leaders = mongoose.model('Leader', leaderSchema);
module.exports= Leaders;