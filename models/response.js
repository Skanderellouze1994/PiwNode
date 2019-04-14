const mongoose = require('mongoose');

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
