const mongoose = require('mongoose');
var tutor = require('./user');

var ressourceSchema = new mongoose.Schema({

    name: {
        type: String
    },
    creationDate :{
        type: Date ,
        default: Date.now
    },
    description: {
        type: String
    },
    path: {
        type: String
    },
    tutor: tutor
});

module.exports = ressourceSchema;