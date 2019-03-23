const mongoose = require('mongoose');
var ressources = require('./ressources');
var tutor = require('./user');
var quiz = require('./quiz');

var courseSchema = new mongoose.Schema({

    title: {
        type: String
    },
    startDate :{
        type: Date
    },
    endDate :{
        type: Date
    },
    description: {
        type: String
    },
    objectives: {
        type: String
    },
    category: {
        type: String
    },
    period: {
        type: Number
    },
    ressources: [ressources],
    tutorCreator: tutor,
    quiz: quiz
});

module.exports = courseSchema;