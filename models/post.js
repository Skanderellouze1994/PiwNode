const mongoose = require('mongoose');
var userSchema = require('../models/user');
var responses = require('../models/response');
var user = require('./user');

var postSchema = new mongoose.Schema({

    subject: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    pic: {
        type: String
    },
    description: {
        type: String,
        minLength:20,
        maxLength:5000
    },
    datePost :{
        type: Date,
        default: Date.now
    },
    userPost: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    responses: [responses]
});

module.exports = mongoose.model('Post', postSchema);
