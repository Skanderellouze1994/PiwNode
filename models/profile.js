const mongoose = require('mongoose');

var skillsSchema = new mongoose.Schema({

    type: {
        type: String
    },
    level:{
        type:Number
    }
});

var anteriorCurriculumsSchema = new mongoose.Schema({

    name: {
        type: String
    }
});

var profileSchema = new mongoose.Schema({

    score: {
        type: int
    },
    skills: [skillsSchema],
    anteriorCurriculums : [anteriorCurriculumsSchema]
});

module.exports = module.exports = mongoose.model('Profile', profileSchema);
