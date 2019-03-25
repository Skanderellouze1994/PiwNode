const mongoose = require('mongoose');
var userSchema = require('../models/user');
var responses = require('../models/response');

var postSchema = new mongoose.Schema({

    subject: {
        type: String
    },
    description: {
        type: String
    },
    datePost :{
        type: Date,
        default: Date.now
    },
    userPost: userSchema,
    responses: [responses]
});

module.exports = postSchema;