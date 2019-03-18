const mongoose = require('mongoose');
var user = require('user');

var messageSchema = new mongoose.Schema({

    textMessage: {
        type: String
    },
    dateCreation :{
        type: Date
    },
    user: user
});

module.exports = mongoose.model('Message', messageSchema);