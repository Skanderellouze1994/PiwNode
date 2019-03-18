const mongoose = require('mongoose');
var user = require('user');

var responseSchema = new mongoose.Schema({

    description: {
        type: String
    },
    dateResponse :{
        type: Date
    },
    userResponse: user
});

module.exports = mongoose.model('Response', responseSchema);