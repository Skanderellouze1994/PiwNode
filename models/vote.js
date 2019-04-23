const mongoose = require('mongoose');
var userSchema = require('../models/user');
var responses = require('../models/response');
var user = require('./user');

var voteSchema = new mongoose.Schema({

    userVote: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    postVote: {type:mongoose.Schema.Types.ObjectId,ref:'Post'}
});

module.exports = mongoose.model('Vote', voteSchema);
