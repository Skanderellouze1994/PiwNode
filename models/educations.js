const mongoose = require('mongoose');

var educationSchema = new mongoose.Schema({

    title: {
        type: String
    },
    degree: {
        type: String
    },date1: {
        type: String
    },date2: {
        type: String
    },
    description: {
        type: String
    },

});
module.exports = educationSchema;
