const mongoose = require('mongoose');

var educationSchema = new mongoose.Schema({

    titre: {
        type: String
    },
    degree: {
        type: String
    },date1: {
        type: String
    },date2: {
        type: String
    },

});
module.exports = educationSchema;
