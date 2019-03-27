const mongoose = require('mongoose');

var skillsSchema = new mongoose.Schema({

    title: {
        type: String
    },
    count:{
        type:Number
    }
});
module.exports = skillsSchema;
