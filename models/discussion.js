const mongoose = require('mongoose');
var messageUser = require('message');
var users = require('user');

var discussionSchema = new mongoose.Schema({

    name: {
        type: String
    },
    dateCreation :{
        type: Date
    },
    messages: [messageUser],
    users: [users]
});

module.exports = mongoose.model('Discussion', discussionSchema);