const mongoose = require('mongoose');
var user = require('./user');

var propositionSchema = new mongoose.Schema({

    name: {
        type: String
    }
});
var responseSchema = new mongoose.Schema({

    rightResponse: {
        type: String
    },
    student: user
});
var questionSchema = new mongoose.Schema({

    name: {
        type: String
    },
    propositions: [propositionSchema],
    response: responseSchema,
    rightResponse: {
        type: String
    }

});

var quizSchema = new mongoose.Schema({

    name: {
        type: String
    },
    tutor: user,
    questions: questionSchema
});

module.exports = quizSchema;