const mongoose = require('mongoose');
var user = require('../models/user');
var post = require('../models/post');
var user = require('./user');

var responseSchema = new mongoose.Schema({

    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    dateResponse :{
        type: Date,
        default: Date.now
    },
    userResponse: {type:mongoose.Schema.Types.ObjectId,ref:'User'}
});

 module.exports=responseSchema
