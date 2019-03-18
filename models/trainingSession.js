const mongoose = require('mongoose');
var tutor = require('user');
var students = require('user');
var courses = require('course');

var trainingSessionSchema = new mongoose.Schema({

    name: {
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
    tutor: tutor,
    studentsList: [students],
    courses: [courses]
    });

module.exports = mongoose.model('TrainingSession', trainingSessionSchema);