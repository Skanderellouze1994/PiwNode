const mongoose = require('mongoose');
var skills = require('./skills')
const educations = require('../models/educations')
const positions = require('../models/positions')
var profileSchema = new mongoose.Schema({


    skills: [skills],

    name: {type: String},
    headline:{type:String},
    location:{type:String},
    summary:{type:String},

    education:[educations],
    position:[positions]
});

 module.exports = mongoose.model('Profile', profileSchema);
