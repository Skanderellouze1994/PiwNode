const mongoose = require('mongoose');
var user = require('../models/user');
var post = require('../models/post');

var responseSchema = new mongoose.Schema({

    description: {
        type: String
    },
    status: {
        type: String
    },
    dateResponse :{
        type: Date,
        default: Date.now
    },
    userResponse: user
});

module.exports = responseSchema;