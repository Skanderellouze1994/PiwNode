const mongoose = require('mongoose');

var positionsSchema = new mongoose.Schema({

    title: {
        type: String
    },
    companyName: {
        type: String
    },
    description: {
        type: String
    },date1: {
        type: String
    },date2: {
        type: String
    },


});
module.exports = positionsSchema;
