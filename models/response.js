const mongoose = require('mongoose');
var user = require('user');

var responseSchema = new mongoose.Schema({

    description: {
        type: String
    },
    dateResponse :{
        type: Date,
        default: Date.now
    },
    userResponse: user
});

module.exports = responseSchema;