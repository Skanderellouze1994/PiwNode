const mongoose = require('mongoose');
var user = require('user');
var responses = require('response');

var postSchema = new mongoose.Schema({

    subject: {
        type: String
    },
    description: {
        type: String
    },
    datePost :{
        type: Date
    },
    userPost: user,
    responses: [responses]
});

module.exports = mongoose.model('Post', postSchema);